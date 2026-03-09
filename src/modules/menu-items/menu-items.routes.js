const express = require('express');
const router = express.Router();

//here in this endpoint we merge the get all menu items with get all the menuitems for specific category it will be handled in teh controller code
//aand here the filtering things can be changed easily
/**
 * @swagger
 * /api/v1/menu-items:
 *   get:
 *     summary: Get all menu items
 *     tags: [MenuItems]
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter by category
 *       - in: query
 *         name: is_available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get all menu items not implemented yet' });
});


/**
 * @swagger
 * /api/v1/menu-items/{id}:
 *   get:
 *     summary: Get one menu item by ID
 *     tags: [MenuItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item details
 *       404:
 *         description: Menu item not found
 */
router.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Get menu item not implemented yet' });
});


/**
 * @swagger
 * /api/v1/menu-items:
 *   post:
 *     summary: Create a new menu item (Admin)
 *     tags: [MenuItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category_id, name, price]
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 45.00
 *               description:
 *                 type: string
 *                 example: Delicious pizza
 *               image_url:
 *                 type: string
 *                 example: https://image.com/pizza.jpg
 *               is_available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Menu item created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create menu item not implemented yet' });
});


/**
 * @swagger
 * /api/v1/menu-items/{id}:
 *   patch:
 *     summary: Update a menu item (Admin)
 *     tags: [MenuItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               is_available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Menu item updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Menu item not found
 */
router.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Update menu item not implemented yet' });
});

/**
 * @swagger
 * /api/v1/menu-items/{id}:
 *   delete:
 *     summary: Delete a menu item (Admin)
 *     tags: [MenuItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Menu item ID
 *     responses:
 *       204:
 *         description: Menu item deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Menu item not found
 */
router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Delete menu item not implemented yet' });
});

module.exports = router;