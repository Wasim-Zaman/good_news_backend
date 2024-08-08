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
 *   name: LiveNews
 *   description: Live News management
 */

/**
 * @swagger
 * /api/live-news/v1/live-news:
 *   post:
 *     summary: Create a new live news item
 *     tags: [LiveNews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 example: "Media Source"
 *                 description: The media source of the live news
 *               name:
 *                 type: string
 *                 example: "News Name"
 *                 description: The name of the live news
 *               uri:
 *                 type: string
 *                 example: "https://example.com/news"
 *                 description: The URI of the live news
 *     responses:
 *       201:
 *         description: Live news item created successfully
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
 *                   example: Live news item created successfully
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
 * /api/live-news/v1/live-news/{id}:
 *   get:
 *     summary: Retrieve a live news item by ID
 *     tags: [LiveNews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the live news item to retrieve
 *     responses:
 *       200:
 *         description: Live news item retrieved successfully
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
 *                   example: Live news item retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     media:
 *                       type: string
 *                       example: "Media Source"
 *                     name:
 *                       type: string
 *                       example: "News Name"
 *                     uri:
 *                       type: string
 *                       example: "https://example.com/news"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Live news item not found
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
 *                   example: Live news item not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/live-news/v1/live-news/all:
 *   get:
 *     summary: Retrieve all live news items
 *     tags: [LiveNews]
 *     responses:
 *       200:
 *         description: Live news items retrieved successfully
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
 *                   example: Live news items retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       media:
 *                         type: string
 *                         example: "Media Source"
 *                       name:
 *                         type: string
 *                         example: "News Name"
 *                       uri:
 *                         type: string
 *                         example: "https://example.com/news"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No live news items found
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
 *                   example: No live news items found
 */

/**
 * @swagger
 * /api/live-news/v1/live-news:
 *   get:
 *     summary: Retrieve paginated live news items with optional search query
 *     tags: [LiveNews]
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
 *         description: The search query to filter live news items.
 *     responses:
 *       200:
 *         description: Live news items retrieved successfully
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
 *                   example: Live news items retrieved successfully
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
 *                     liveNewsItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           media:
 *                             type: string
 *                             example: "Media Source"
 *                           name:
 *                             type: string
 *                             example: "News Name"
 *                           uri:
 *                             type: string
 *                             example: "https://example.com/news"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No live news items found
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
 *                   example: No live news items found
 */

/**
 * @swagger
 * /api/live-news/v1/live-news/{id}:
 *   put:
 *     summary: Update a live news item
 *     tags: [LiveNews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the live news item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 description: The media source of the live news
 *               name:
 *                 type: string
 *                 description: The name of the live news
 *               uri:
 *                 type: string
 *                 description: The URI of the live news
 *     responses:
 *       200:
 *         description: Live news item updated successfully
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
 *                   example: Live news item updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     media:
 *                       type: string
 *                       example: "Media Source"
 *                     name:
 *                       type: string
 *                       example: "News Name"
 *                     uri:
 *                       type: string
 *                       example: "https://example.com/news"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Live news item not found
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
 *                   example: Live news item not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/live-news/v1/live-news/{id}:
 *   delete:
 *     summary: Delete a live news item
 *     tags: [LiveNews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the live news item to delete
 *     responses:
 *       200:
 *         description: Live news item deleted successfully
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
 *                   example: Live news item deleted successfully
 *       404:
 *         description: Live news item not found
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
 *                   example: Live news item not found
 *     security:
 *       - bearerAuth: []
 */
