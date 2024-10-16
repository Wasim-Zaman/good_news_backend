/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/users/v1/users/login:
 *   post:
 *     summary: Login a user or create a new user if not exists
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - language
 *               - state
 *               - district
 *               - constituency
 *               - mandal
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number
 *               fcmToken:
 *                 type: string
 *                 description: Firebase Cloud Messaging token
 *               timeZone:
 *                 type: string
 *                 description: Time zone of the user
 *               language:
 *                 type: string
 *                 description: User's language
 *               state:
 *                 type: string
 *                 description: User's state
 *               district:
 *                 type: string
 *                 description: User's district
 *               constituency:
 *                 type: string
 *                 description: User's constituency
 *               mandal:
 *                 type: string
 *                 description: User's mandal
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "uuid"
 *                         mobileNumber:
 *                           type: string
 *                           example: "+1234567890"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         image:
 *                           type: string
 *                           example: "path/to/image.jpg"
 *                         timeZone:
 *                           type: string
 *                           example: "UTC"
 *                         language:
 *                           type: string
 *                           example: "English"
 *                         state:
 *                           type: string
 *                           example: "California"
 *                         district:
 *                           type: string
 *                           example: "Los Angeles"
 *                         constituency:
 *                           type: string
 *                           example: "Downtown"
 *                         mandal:
 *                           type: string
 *                           example: "Central"
 *                     token:
 *                       type: string
 *                       example: "jwt_token"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/users/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mobileNumber
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number
 *               timeZone:
 *                 type: string
 *                 description: Time zone of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/v1/users/me:
 *   get:
 *     summary: Retrieve the currently logged-in user's details
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/v1/users:
 *   get:
 *     summary: Retrieve all users with optional search query and pagination
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalCount:
 *                       type: integer
 *                       example: 50
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/v1/users/{mobileNumber}:
 *   put:
 *     summary: Update a user's details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: mobileNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobile number of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         mobileNumber:
 *           type: string
 *           example: "+1234567890"
 *         image:
 *           type: string
 *           example: "path/to/image.jpg"
 *         timeZone:
 *           type: string
 *           example: "UTC"
 *         language:
 *           type: string
 *           example: "English"
 *         state:
 *           type: string
 *           example: "California"
 *         district:
 *           type: string
 *           example: "Los Angeles"
 *         constituency:
 *           type: string
 *           example: "Downtown"
 *         mandal:
 *           type: string
 *           example: "Central"
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         fcmToken:
 *           type: string
 *         timeZone:
 *           type: string
 *         language:
 *           type: string
 *         state:
 *           type: string
 *         district:
 *           type: string
 *         constituency:
 *           type: string
 *         mandal:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message
 */
