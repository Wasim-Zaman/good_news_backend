/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - type
 *         - description
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         type:
 *           type: string
 *           description: The type of the post
 *         description:
 *           type: string
 *           description: The description of the post
 *         status:
 *           type: string
 *           enum: [PUBLISHED, REJECTED, PENDING]
 *           description: The status of the post
 *         image:
 *           type: string
 *           description: The path to the post's image file
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the post was last updated
 *         userId:
 *           type: string
 *           description: The ID of the associated user
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/post/v1/post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - description
 *               - status
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PUBLISHED, REJECTED, PENDING]
 *               image:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/post/v1/posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No posts found
 */

/**
 * @swagger
 * /api/post/v1/post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The post was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PUBLISHED, REJECTED, PENDING]
 *               image:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
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
 *         description: The post was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/post/v1/posts/type/{type}:
 *   get:
 *     summary: Get posts by type
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of posts of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No posts found for this type
 */

/**
 * @swagger
 * /api/post/v1/post/{id}/view:
 *   post:
 *     summary: Add a view to a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: View added successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/post/v1/posts/paginated:
 *   get:
 *     summary: Get paginated posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/post/v1/post/{id}/status:
 *   patch:
 *     summary: Update post status (admin only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PUBLISHED, REJECTED, PENDING]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
