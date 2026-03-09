// there is very important principle in the restful apis and this is 
//RESTful principle: each resource owns its data.
//and this is responsability principle and that cause here i was thinking about to add endpoint to return all the items with their information for specific category
//which it is wrong here and that cause this items data not the responability of the categories resource 

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get all categories not implemented yet' });
});


/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create category not implemented yet' });
});


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update a category by ID (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pasta
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Update category not implemented yet' });
});


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Delete category not implemented yet' });
});

module.exports = router;