const express = require('express');
const router = express.Router();

//this is to get the current user orders history
/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders for the current authenticated customer
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, preparing, ready, delivered, cancelled]
 *         description: Filter by order status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get all orders not implemented yet' });
});


/*
Authentication = proving who you are     → 401 if failed
Authorization  = proving what you can do → 403 if failed
 */
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get one order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details with items
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Can only view your own orders
 *       404:
 *         description: Order not found
 */
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get order not implemented yet' });
});

//here we will get the currnet user cart and make order object and thats why there is no request body
//the 409 status code here will be available in the concurreny problem 
/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Place a new order from current cart (Customer)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Insufficient stock for one or more items
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Place order not implemented yet' });
});

/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Staff/Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, preparing, ready, delivered, cancelled]
 *                 example: preparing
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid status
 *       401: 
 *         Unauthenticated - no token provided
 *       403: 
 *         Forbidden - Staff and Admin only
 *       404:
 *         description: Order not found
 */
router.patch('/:id/status', (req, res) => {
  res.status(501).json({ message: 'Update order status not implemented yet' });
});

module.exports = router;