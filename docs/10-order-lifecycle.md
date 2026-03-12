# Order Lifecycle

## Issue #10  Smart Restaurant Order System

---

## Objective
Define how orders move through the system  what states exist,
what transitions are allowed, and who can trigger each transition.

---

## Q1: What States Exist?

| State | Description |
|-------|-------------|
| `pending` | Order placed by customer  waiting for kitchen to start |
| `preparing` | Kitchen has started cooking the order |
| `ready` | Food is ready  waiting to be delivered |
| `delivered` | Order delivered to customer  final state |
| `cancelled` | Order was cancelled  final state |
>this states already defined in the initial schema with normalization file 

---

## Q2: State Diagram
```
                    ┌───────────┐
                    │  pending  │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       ┌────────────┐          ┌────────────┐
       │ preparing  │          │ cancelled  │
       └─────┬──────┘          └────────────┘
             │                 (final state)
             │
             ▼
        ┌─────────┐
        │  ready  │
        └────┬────┘
             │
             ▼
       ┌───────────┐
       │ delivered │
       └───────────┘
       (final state)
```

### All Allowed Transitions

| From | To | Who |
|------|----|-----|
| `pending` | `preparing` | Kitchen / Admin |
| `pending` | `cancelled` | Customer / Admin |
| `preparing` | `ready` | Kitchen / Admin |
| `preparing` | `cancelled` | Admin only |
| `ready` | `delivered` | Kitchen / Admin |
| `delivered` | anything | ❌ not allowed |
| `cancelled` | anything | ❌ not allowed |

---

## Q3: Who Can Change State?

### Customer
- Can only cancel their own order but this only allowed when status is `pending`

- Cannot move order forward at any stage

### Kitchen Staff
- `pending` → `preparing`  starts cooking
- `preparing` → `ready`  food is done
- `ready` → `delivered`  order delivered to customer
- Cannot cancel any order

### Admin
- Can do everything Kitchen can
- Can also cancel a `preparing` order on behalf of customer
- Has full override on all transitions

---

## Stock Restore on Cancellation

When an order is cancelled  stock must be restored:
```
Order cancelled
      ↓
For each item in order_items
      ↓
stock.quantity += order_item.quantity
```

This applies whether cancelled by Customer or Admin.

> **Why?**
> Stock was decremented atomically at checkout.
> If the order never completes, those items must go back
> to stock so other customers can order them.

---

## Invalid Transitions — What Happens?

If someone tries an invalid transition (e.g. delivered → preparing):
```json
{
  "success": false,
  "message": "Invalid status transition"
}
```

Status code: `400 Bad Request`

This will be enforced in the orders service during implementation.

---

## Summary
```
Customer  → cancel pending only
Kitchen   → move order forward only
Admin     → full control
```
```
delivered  → final state means no transitions out
cancelled  → final state means no transitions out & stock restored for all items
           
```