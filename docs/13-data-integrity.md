# Data Integrity & Auditability

## Issue #13 in  Smart Restaurant Order System

---

## Objective
Track changes safely, protect critical data from modification,
and provide the ability to debug production issues.

---

## Q1: What Needs History?

History means we need to track changes over time 
we need to know what changed, and when.

### Order Status Changes
Orders move through a lifecycle: `pending → preparing → ready → delivered`

Why it needs history:
If a customer complains that their order was never delivered,
we need to trace exactly when each status change happened.
Without history we cannot prove or investigate what went wrong.

The `updated_at` timestamp on the Order table records
when the last status change happened.

### Stock Changes
Stock is decremented on every order and restored on every cancellation.

Why it needs history:
If stock reaches 0 unexpectedly or goes negative,
we need to trace which orders caused it and when.
The `created_at` timestamp on orders combined with stock
decrement logic gives us a trail to follow.



---

## Q2: What Must Be Immutable?

Immutable means once created, the record must never be
modified or deleted if you want to make a change so make new instance .

### Payment
A payment record is a financial transaction.

Why it must be immutable:
Modifying a payment after creation would be financial fraud.
Once a payment is recorded it must stay exactly as it was 
the amount, the order it belongs to, and the timestamp.

The UNIQUE constraint on `payments.order_id` ensures
one payment per order and no duplicates.

### OrderItem
An OrderItem is a frozen snapshot of a dish at the moment
it was ordered  dish name, quantity, and exact price paid.

Why it must be immutable:
If menu prices change after an order is placed,
the customer's original order must reflect what they
actually paid  not the new price.
This is why OrderItem and MenuItem are two separate entities.
MenuItem is mutable (price can change),
OrderItem is immutable (price is locked at order time).

---

## Q3: How to Debug Production Issues?

Three tools work together to make production debugging possible:

### 1. Timestamps on All Tables
Every table has `created_at` and `updated_at` fields.

Why:
Timestamps answer WHEN something happened.
Without them you know what happened but cannot connect
it to a specific time or a specific customer complaint.

Example:
Customer says "my order disappeared around 8pm yesterday"
→ search logs for 8pm → find the exact event chain.

### 2. Winston Logger / Morgan 
there is this 2 things we can use it in node js when i will implement and use it i will search about each one pros/cons and then decide which one will be more useful in my case.

Winston is a Node.js logging library that writes every
important event and error to a persistent log file.

Why:
Console logs disappear when the server restarts.
Winston writes to a file that survives restarts 
so if something breaks at 3am you can open the log
file the next morning and see exactly what happened.

Example log output:
```
2026-03-25 20:00:01 INFO  POST /orders 201 45ms
2026-03-25 20:00:02 ERROR insufficient stock for item_id=5
2026-03-25 20:00:03 INFO  POST /payments 201 12ms
```

### 3. AppError Class
AppError gives every error a consistent structure:
`{ statusCode: 409, message: 'Insufficient stock' }`

Why:
When Winston catches an error and writes it to the log file and in the console too ,
a consistent structure makes the log clean and readable.
Without AppError, errors would be random and hard to trace
in production logs.

---

## Summary

| Question | Answer |
|---|---|
| What needs history? | Order status changes, stock changes |
| What must be immutable? | Payment records, OrderItems |
| How to debug production issues? | Timestamps on all tables + Winston/Morgan logger + AppError class |