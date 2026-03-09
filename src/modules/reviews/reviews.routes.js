const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Submit a review for a delivered order (Customer)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [order_id, rating]
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 10
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               content:
 *                 type: string
 *                 example: Great food!
 *     responses:
 *       201:
 *         description: Review submitted
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - can only review your own orders
 *       409:
 *         description: Review already submitted for this order
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create review not implemented yet' });
});


/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews (Public)
 *     tags: [Reviews]
 *     parameters:
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
 *         description: List of reviews
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get all reviews not implemented yet' });
});

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get one review by ID (Public)
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get review not implemented yet' });
});

module.exports = router;