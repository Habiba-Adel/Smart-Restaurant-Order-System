# Concurrency & Consistency Strategy

## Issue #11  Smart Restaurant Order System

---

## Objective
Identify every place in the system where two users can touch
the same shared resource at the same time  and define the
strategy to prevent data corruption in each case.

---

## Core Principle

Each user request runs in its own isolated process.
A race condition only happens when two requests touch
the **same shared resource** at the same time.
```
User A request  ──────┐
                      ▼
              shared resource  ← race condition happens HERE
                      ▲
User B request  ──────┘
```

**The only real shared resource in this project is `stock`.**

Every other resource (payments, reviews, orders) belongs to
a specific customer  fully isolated between users.
Race conditions only happen at checkout when two customers
order the same item simultaneously.

---

## Q1: What Operations Must Be Atomic?

An operation is atomic when it must either complete fully or
not happen at all  no partial state allowed.

| Operation | Why it must be atomic |
|-----------|----------------------|
| Checkout  place order | Read stock → decrement stock → create order → create order_items must all succeed or all fail together |
| Cancel order | Update order status → restore stock must happen together |

---

## Q2: Where Can Race Conditions Occur?

### Risk 1  Stock Overselling at Checkout ← The Only Real Concurrency Risk

**Scenario:**
```
Stock for Pizza = 1

10:00:00  Customer A reads stock → sees quantity = 1 ✅
10:00:00  Customer B reads stock → sees quantity = 1 ✅

10:00:01  Customer A places order → stock = 0 ✅
10:00:01  Customer B places order → stock = -1 ❌ oversold
```

**Why it happens:**
Both customers read stock before either one decremented it.
This is called a **read-modify-write race condition**.
This is the only place in the system where two different users
touch the same row in the database at the same time.

**Strategy  Prisma atomic transaction + FOR UPDATE lock:**
```javascript
await prisma.$transaction(async (tx) => {
  // 1. lock the stock row no other transaction can read it now
  const stock = await tx.$queryRaw`
    SELECT * FROM stock
    WHERE menu_item_id = ${id}
    FOR UPDATE
  `;

  // 2. check quantity
  if (stock.quantity < requiredQuantity) {
    throw new AppError('Insufficient stock', 409);
  }

  // 3. decrement
  await tx.stock.update({
    where: { menu_item_id: id },
    data: { quantity: { decrement: requiredQuantity } }
  });

  // 4. create order + order_items inside same transaction
});
```

`FOR UPDATE` locks the stock row  Customer B must wait
until Customer A's transaction finishes before reading.

---

## Q3: How to Prevent Double Processing?

Double processing is not a concurrency problem between different users 
it is a **duplicate request problem** from the same user.
Example: customer clicks Pay twice fast, sending 2 requests.

The solution is not a transaction  it is a **database UNIQUE constraint**
that rejects the second insert automatically.

### Double Payment Protection
```
Customer clicks Pay button twice fast
→ Two POST /payments requests fire
→ Both try to insert a payment for the same order
→ UNIQUE constraint on order_id rejects the second one → 409
```
```sql
order_id INT NOT NULL UNIQUE  -- already in schema
```

### Double Review Protection
```
Customer submits review twice
→ Two POST /reviews requests
→ UNIQUE constraint on order_id rejects the second one → 409
```
```sql
order_id INT NOT NULL UNIQUE  -- already in schema
```

---

## Order Status Conflict

**Scenario:**
```
Kitchen staff A and B open the same order
Both try to move it from pending → preparing at the same time
```

**Strategy is to validate transition before update:**
```javascript
if (order.status !== 'pending') {
  throw new AppError('Invalid status transition', 400);
}
```

The second request will read `preparing` and reject the transition.
As defined in Issue #10  only valid transitions are allowed.

---

## Stock Restore on Cancellation

When an order is cancelled  stock must be restored atomically:
```javascript
await prisma.$transaction(async (tx) => {
  // 1. update order status
  await tx.order.update({
    where: { id: orderId },
    data: { status: 'cancelled' }
  });

  // 2. restore stock for each item
  for (const item of orderItems) {
    await tx.stock.update({
      where: { menu_item_id: item.menu_item_id },
      data: { quantity: { increment: item.quantity } }
    });
  }
});
```

Both operations happen together if one fails, neither happens and that why we say it need to be atomic and why we need using transactions in this system.

---

## Summary
```
Stock at checkout     → THE only real race condition
                      → Prisma transaction + FOR UPDATE lock

Double payment        → duplicate request protection
                      → UNIQUE constraint on payments.order_id

Double review         → duplicate request protection
                      → UNIQUE constraint on reviews.order_id

Status conflict       → validate transition before update

Cancel order          → atomic transaction to restore stock
```

The database constraints handle duplicate requests.
The application layer handles race conditions with transactions.