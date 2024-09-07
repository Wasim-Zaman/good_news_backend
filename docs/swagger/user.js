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
 *     summary: Login a user and get a JWT token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number
 *                 example: "+1234567890"
 *               fcmToken:
 *                 type: string
 *                 description: Firebase Cloud Messaging token
 *                 example: "example_fcm_token"
 *               timeZone:
 *                 type: string
 *                 description: Time zone of the user
 *                 example: "UTC"
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
 *                     token:
 *                       type: string
 *                       example: "jwt_token"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number
 *                 example: "+1234567890"
 *               timeZone:
 *                 type: string
 *                 description: Time zone of the user
 *                 example: "UTC"
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     mobileNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     image:
 *                       type: string
 *                       example: null
 *                     timeZone:
 *                       type: string
 *                       example: "UTC"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     mobileNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     image:
 *                       type: string
 *                       example: "path/to/image.jpg"
 *                     timeZone:
 *                       type: string
 *                       example: "UTC"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
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
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           mobileNumber:
 *                             type: string
 *                             example: "+1234567890"
 *                           image:
 *                             type: string
 *                             example: "path/to/image.jpg"
 *                           timeZone:
 *                             type: string
 *                             example: "UTC"
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No users found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/v1/users/{id}:
 *   put:
 *     summary: Update a user's details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *                 example: "John Doe"
 *               mobileNumber:
 *                 type: string
 *                 description: The updated mobile number
 *                 example: "+1234567890"
 *               image:
 *                 type: string
 *                 description: The updated path to the user image
 *                 example: "path/to/new_image.jpg"
 *               timeZone:
 *                 type: string
 *                 description: The updated time zone
 *                 example: "UTC"
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     mobileNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     image:
 *                       type: string
 *                       example: "path/to/new_image.jpg"
 *                     timeZone:
 *                       type: string
 *                       example: "UTC"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *     security:
 *       - bearerAuth: []
 */
