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
 *   name: Blogs
 *   description: Blog management
 */

/**
 * @swagger
 * /api/blog/v1/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The blog image to upload
 *               title:
 *                 type: string
 *                 example: "Blog Title"
 *                 description: The title of the blog
 *               visibility:
 *                 type: string
 *                 example: "public"
 *                 description: The visibility status of the blog
 *               publishDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-07-24T12:00:00Z"
 *                 description: The publish date and time of the blog
 *               status:
 *                 type: integer
 *                 example: 1
 *                 description: The status of the blog
 *               type:
 *                 type: string
 *                 example: "news"
 *                 description: The type of the blog
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   example: Blog created successfully
 *                 data:
 *                   type: object
 *                   nullable: true
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
 * /api/blog/v1/blogs/{id}:
 *   get:
 *     summary: Retrieve a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
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
 *                   example: Blog retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     image:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *                     title:
 *                       type: string
 *                       example: "Blog Title"
 *                     visibility:
 *                       type: string
 *                       example: "public"
 *                     views:
 *                       type: integer
 *                       example: 192
 *                     publishDateTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     lastModified:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     type:
 *                       type: string
 *                       example: "news"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Blog not found
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
 *                   example: Blog not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/blog/v1/blogs/all:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
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
 *                   example: Blogs retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       title:
 *                         type: string
 *                         example: "Blog Title"
 *                       visibility:
 *                         type: string
 *                         example: "public"
 *                       views:
 *                         type: integer
 *                         example: 192
 *                       publishDateTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       lastModified:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *                       status:
 *                         type: integer
 *                         example: 1
 *                       type:
 *                         type: string
 *                         example: "news"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No blogs found
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
 *                   example: No blogs found
 */

/**
 * @swagger
 * /api/blog/v1/blogs:
 *   get:
 *     summary: Retrieve paginated blogs with optional search query
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter blogs.
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
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
 *                   example: Blogs retrieved successfully
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
 *                     blogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           image:
 *                             type: string
 *                             example: "https://example.com/image.jpg"
 *                           title:
 *                             type: string
 *                             example: "Blog Title"
 *                           visibility:
 *                             type: string
 *                             example: "public"
 *                           views:
 *                             type: integer
 *                             example: 192
 *                           publishDateTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           lastModified:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           type:
 *                             type: string
 *                             example: "news"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No blogs found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No blogs found
 */

/**
 * @swagger
 * /api/blog/v1/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new blog image to upload
 *               title:
 *                 type: string
 *                 description: The title of the blog
 *               visibility:
 *                 type: string
 *                 description: The visibility status of the blog
 *               publishDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The publish date and time of the blog
 *               status:
 *                 type: integer
 *                 description: The status of the blog
 *               type:
 *                 type: string
 *                 description: The type of the blog
 *     responses:
 *       200:
 *         description: Blog updated successfully
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
 *                   example: Blog updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     image:
 *                       type: string
 *                       example: "https://example.com/new-image.jpg"
 *                     title:
 *                       type: string
 *                       example: "New Blog Title"
 *                     visibility:
 *                       type: string
 *                       example: "private"
 *                     views:
 *                       type: integer
 *                       example: 192
 *                     publishDateTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     lastModified:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     type:
 *                       type: string
 *                       example: "news"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Blog not found
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
 *                   example: Blog not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/blog/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the blog to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
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
 *                   example: Blog deleted successfully
 *       404:
 *         description: Blog not found
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
 *                   example: Blog not found
 *     security:
 *       - bearerAuth: []
 */
