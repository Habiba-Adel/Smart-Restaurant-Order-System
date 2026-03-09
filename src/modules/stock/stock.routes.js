const express = require('express');
const router = express.Router();

//here we can think about making post endpoint to make stock for item with quanitiy 
//but this will already happened automatically but in the endpoint of adding new menu item when making post with it
//so it is auto make new stock with quantity 0 and then it is updated here with the quantity 

/**
 * @swagger
 * /api/v1/stock:
 *   get:
 *     summary: Get stock levels for all menu items (Admin)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stock levels
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get stock not implemented yet' });
});

/**
 * @swagger
 * /api/v1/stock/{menu_item_id}:
 *   patch:
 *     summary: Update stock quantity for a menu item (Admin)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Stock updated
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Menu item not found
 */
router.patch('/:menu_item_id', (req, res) => {
  res.status(501).json({ message: 'Update stock not implemented yet' });
});

module.exports = router;