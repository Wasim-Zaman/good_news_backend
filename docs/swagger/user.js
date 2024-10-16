/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         image:
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
 *         reporter:
 *           $ref: '#/components/schemas/Reporter'
 *     Reporter:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         state:
 *           type: string
 *         district:
 *           type: string
 *         constituency:
 *           type: string
 *         mandal:
 *           type: string
 *         status:
 *           type: string
 *           enum: [WAITING, APPROVED, REJECTED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UserInput:
 *       type: object
 *       required:
 *         - mobileNumber
 *         - language
 *         - state
 *         - district
 *         - constituency
 *         - mandal
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
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/v1/users/{mobileNumber}:
 *   put:
 *     summary: Update a user's details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mobileNumber
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fcmToken:
 *                 type: string
 *               timeZone:
 *                 type: string
 *               language:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               constituency:
 *                 type: string
 *               mandal:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/v1/users:
 *   get:
 *     summary: Get all users with pagination and search
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for name or mobile number
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/users/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/v1/users/me:
 *   get:
 *     summary: Get current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
