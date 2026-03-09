const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Create a payment for an order (Customer)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [order_id, method]
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 10
 *               method:
 *                 type: string
 *                 enum: [cash, card, online]
 *                 example: cash
 *     responses:
 *       201:
 *         description: Payment created
 *       400:
 *         description: Order already paid or invalid status
 *       401:
 *         description: Unauthenticated
 *       404:
 *         description: Order not found
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create payment not implemented yet' });
});

//get specific payment order by using the id
/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get one payment by ID (Customer - own only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - can only view your own payments
 *       404:
 *         description: Payment not found
 */
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get payment not implemented yet' });
});


module.exports = router;