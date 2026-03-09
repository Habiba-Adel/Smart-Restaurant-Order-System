const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/staff:
 *   get:
 *     summary: Get all staff members (Admin)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 */
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get all staff not implemented yet' });
});

/**
 * @swagger
 * /api/v1/staff:
 *   post:
 *     summary: Create a new staff account (Admin)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed
 *               email:
 *                 type: string
 *                 example: ahmed@staff.com
 *               password:
 *                 type: string
 *                 example: pass123
 *               role:
 *                 type: string
 *                 enum: [admin, kitchen]
 *                 example: kitchen
 *     responses:
 *       201:
 *         description: Staff account created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 *       409:
 *         description: Email already exists
 */
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create staff not implemented yet' });
});

/**
 * @swagger
 * /api/v1/staff/{id}:
 *   patch:
 *     summary: Update staff details or role (Admin)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, kitchen]
 *     responses:
 *       200:
 *         description: Staff updated
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Staff not found
 */
router.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Update staff not implemented yet' });
});

/**
 * @swagger
 * /api/v1/staff/{id}:
 *   delete:
 *     summary: Delete a staff account (Admin)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       204:
 *         description: Staff deleted
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Staff not found
 */
router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Delete staff not implemented yet' });
});

module.exports = router;