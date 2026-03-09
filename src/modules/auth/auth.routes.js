//now lets catch module module and define for each one its route file and the swagger comment before each one 
//to then in the final result to manage and orgainze all of this things in the app file in the end

const express=require('express');

const router=express.Router();



//here in auth i will have mainly 3 things log in , register, log out
//now lets put the swagger before each one of them 

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user in the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password,gender]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Habiba
 *               email:
 *                 type: string
 *                 example: habiba@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               gender:
 *                 type: string
 *                 example: female
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */

router.post('/register',(req, res) => {
    //this is dummy things to can run until making the controller
  res.status(501).json({ message: 'register Not implemented yet' });
});


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user into the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: habiba@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
router.post('/login',(req, res) => {
    //this is dummy things to can run until making the controller
  res.status(501).json({ message: 'login Not implemented yet' });
});


/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout',(req, res) => {
    //this is dummy things to can run until making the controller
  res.status(501).json({ message: 'log out Not implemented yet' });
});

module.exports = router;