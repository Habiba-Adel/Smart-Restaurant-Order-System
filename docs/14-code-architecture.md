# Code Architecture Planning

## Issue #14 Smart Restaurant Order System

---

## Objective
Decide the internal code structure  how to separate concerns,
where business logic lives, and how to keep the code testable.

---

## Q1: How to Separate Concerns?

The project follows a modular structure where each layer has one job:
```
src/
├── config/          → configuration only (db, redis, swagger)
├── middlewares/     → cross-cutting concerns (auth, error, role)
├── modules/         → feature modules (each domain in its own folder)
├── utils/           → shared utilities (AppError)
└── websocket/       → real-time layer (order status updates)
```

Each layer is isolated  a middleware does not contain business logic,
a route file does not talk to the database directly.

---

## Q2: Where Does Business Logic Live?

Each module follows a 3-layer pattern:
```
modules/
└── orders/
    ├── orders.routes.js      → routing only, no logic and defination of swagger too
    ├── orders.controller.js  → handles request/response, no logic
    └── orders.service.js     → ALL business logic lives here
```

### Responsibilities per layer:

| Layer | Responsibility |
|---|---|
| routes.js | Define endpoints, attach middlewares |
| controller.js | Parse request, call service, send response |
| service.js | Business logic, database calls via Prisma |

### Example flow:
```
POST /orders
  → orders.routes.js        (route definition)
  → auth.middleware.js       (check token)
  → role.middleware.js       (check customer role)
  → orders.controller.js     (parse body)
  → orders.service.js        (create order, check stock, transaction)
  → Prisma → Database
```

---

## Q3: How to Keep Code Testable?

### app.js vs server.js separation
and this seperation to make the seperate of concern and in the same time to making the testing easy

`server.js` only starts the server:
```javascript
// server.js
const app = require('./app');
app.listen(PORT);
```

`app.js` contains everything else:
```javascript
// app.js
const express = require('express');
const app = express();
// middlewares, routes, swagger...
module.exports = app;
```

This means in tests you can import `app` directly without
starting a real server  this is the standard pattern for
testing Express apps with tools like Jest + Supertest.

### Tests folder (to be created in Issue #15):
```
tests/
├── orders.test.js
├── payments.test.js
└── ...
```

---

## Pending: Prisma Schema

The Prisma schema (`prisma/schema.prisma`) has not been defined yet.
This is the next implementation step  defining all models based on
the database design from Issue #4.

Models needed:
- User
- Category
- MenuItem
- Stock
- Order
- OrderItem
- Payment
- Review

---

## Summary

| Question | Answer |
|---|---|
| How to separate concerns? | Modular folder structure  config, middlewares, modules, utils, websocket |
| Where does business logic live? | Inside `*.service.js` files inside each module |
| How to keep code testable? | `app.js` separated from `server.js` so app can be imported in tests without starting server |