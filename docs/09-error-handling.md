# Error Handling Strategy

## Issue #9 in Smart Restaurant Order System

---

## Objective
Make errors meaningful and consistent across all API endpoints.

---

## Q1: HTTP Status Codes

### Success Codes
| Code | Name | When to use |
|------|------|-------------|
| 200 | OK | Successful GET or PATCH and returns data |
| 201 | Created | Successful POST and new resource created |
| 204 | No Content | Successful DELETE and nothing to return |

> **Why 204 for DELETE?**
> When you delete something, there is nothing to return back.
> Sending a body with 204 is meaningless because the resource is gone.
> So we return 204 with no body at all.

### Error Codes
| Code | Name | When to use |
|------|------|-------------|
| 400 | Bad Request | Missing or invalid fields sent by the user |
| 401 | Unauthorized | No token or invalid/expired token |
| 403 | Forbidden | Valid token but wrong role |
| 404 | Not Found | Resource does not exist in the database |
| 409 | Conflict | Duplicate data like email already exists, order already paid, review already submitted |
| 500 | Internal Server Error | Unexpected server error and this is not the user's fault |

> **401 vs 403 important difference:**
> - 401 = "Who are you?"  authentication failed
> - 403 = "I know you  but you can't do this"  authorization failed

---

## Q2: Standard Error Response Format

Every single error in this project returns the same shape:
```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

### Examples
```json
{ "success": false, "message": "Email already exists" }
{ "success": false, "message": "Invalid credentials" }
{ "success": false, "message": "Order not found" }
{ "success": false, "message": "Something went wrong" }
```

No extra fields, no nested objects always the same shape.

---

## Q3: Validation Errors vs System Errors

### Validation Errors the user's fault
- Status codes: 400, 401, 403, 404, 409
- Cause: the user sent wrong data or does not have permission
- Response: clear, specific message that tells the user exactly what went wrong
- Example:
```json
{ "success": false, "message": "Email already exists" }
{ "success": false, "message": "Cart is empty" }
{ "success": false, "message": "Rating must be between 1 and 5" }
```

### System Errors  the server's fault
- Status code: 500
- Cause: unexpected crash, database connection failed, unhandled exception
- Response: generic message never expose internal details to the user
- The real error is logged in the console only
- Example:
```json
{ "success": false, "message": "Something went wrong" }
```

> **Why hide the real 500 message from the user?**
> Exposing internal error details (stack traces, database errors) is a security risk.
> The user does not need to know what crashed only that something went wrong.

---

## Implementation

### AppError Class  `src/utils/AppError.js`
Used to throw errors from controllers and services with a specific status code:
```javascript
throw new AppError('Email already exists', 409);
throw new AppError('Order not found', 404);
throw new AppError('Invalid credentials', 401);
```

### Error Middleware  `src/middlewares/error.middleware.js`
Catches all errors thrown anywhere in the app and returns the standard response:
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message    = err.message    || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
```

Registered as the **last middleware** in `app.js`  after all routes.

---

## Summary
```
User mistake   → AppError('message', 4xx) → clear message to user
Server crash   → unhandled error          → "Something went wrong"
All errors     → { success: false, message }  → consistent shape
```