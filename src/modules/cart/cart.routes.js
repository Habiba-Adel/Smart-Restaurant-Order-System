const express = require('express');

const router = express.Router();

//get all user cart items to display them
/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get current authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get cart not implemented yet' });
});


//add new item to the user cart 
/**
 * @swagger
 * /api/v1/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [menu_item_id, quantity]
 *             properties:
 *               menu_item_id:
 *                 type: integer
 *                 example: 12
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/items', (req, res) => {
  res.status(501).json({ message: 'Add item to cart not implemented yet' });
});


//update item quantity in the cart and here we use patch cause we will update part of the object
/**
 * @swagger
 * /api/v1/cart/items/{menu_item_id}:
 *   patch:
 *     summary: Update quantity of an item in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the menu item
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
 *                 example: 3
 *     responses:
 *       200:
 *         description: Item quantity updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 */
router.patch('/items/:menu_item_id', (req, res) => {
  res.status(501).json({ message: 'Update cart item not implemented yet' });
});


//remove cart item
/**
 * @swagger
 * /api/v1/cart/items/{menu_item_id}:
 *   delete:
 *     summary: Remove an item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the menu item
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.delete('/items/:menu_item_id', (req, res) => {
  res.status(501).json({ message: 'Remove item from cart not implemented yet' });
});

//clear the whole user cart 
/**
 * @swagger
 * /api/v1/cart:
 *   delete:
 *     summary: Clear the entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/', (req, res) => {
  res.status(501).json({ message: 'Clear cart not implemented yet' });
});


module.exports = router;