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
 *   name: Rss
 *   description: RSS feed management
 */

/**
 * @swagger
 * /api/rss/v1/rss:
 *   post:
 *     summary: Create a new RSS feed item
 *     tags: [Rss]
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
 *                 description: The RSS feed item image to upload
 *               category:
 *                 type: string
 *                 example: "News"
 *                 description: The category of the RSS feed item
 *               language:
 *                 type: string
 *                 example: "English"
 *                 description: The language of the RSS feed item
 *               name:
 *                 type: string
 *                 example: "BBC News"
 *                 description: The name of the RSS feed item
 *               url:
 *                 type: string
 *                 example: "https://example.com/rss-feed.xml"
 *                 description: The URL of the RSS feed item
 *               title:
 *                 type: string
 *                 example: "Breaking News"
 *                 description: The title of the RSS feed item
 *     responses:
 *       201:
 *         description: RSS feed item created successfully
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
 *                   example: RSS feed item created successfully
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
 * /api/rss/v1/rss/{id}:
 *   get:
 *     summary: Retrieve an RSS feed item by ID
 *     tags: [Rss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RSS feed item to retrieve
 *     responses:
 *       200:
 *         description: RSS feed item retrieved successfully
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
 *                   example: RSS feed item retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *                     category:
 *                       type: string
 *                       example: "News"
 *                     language:
 *                       type: string
 *                       example: "English"
 *                     name:
 *                       type: string
 *                       example: "BBC News"
 *                     url:
 *                       type: string
 *                       example: "https://example.com/rss-feed.xml"
 *                     title:
 *                       type: string
 *                       example: "Breaking News"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: RSS feed item not found
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
 *                   example: RSS feed item not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/rss/v1/rss/all:
 *   get:
 *     summary: Retrieve all RSS feed items
 *     tags: [Rss]
 *     responses:
 *       200:
 *         description: RSS feed items retrieved successfully
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
 *                   example: RSS feed items retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       category:
 *                         type: string
 *                         example: "News"
 *                       language:
 *                         type: string
 *                         example: "English"
 *                       name:
 *                         type: string
 *                         example: "BBC News"
 *                       url:
 *                         type: string
 *                         example: "https://example.com/rss-feed.xml"
 *                       title:
 *                         type: string
 *                         example: "Breaking News"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No RSS feed items found
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
 *                   example: No RSS feed items found
 */

/**
 * @swagger
 * /api/rss/v1/rss:
 *   get:
 *     summary: Retrieve paginated RSS feed items with optional search query
 *     tags: [Rss]
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
 *         description: The search query to filter RSS feed items.
 *     responses:
 *       200:
 *         description: RSS feed items retrieved successfully
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
 *                   example: RSS feed items retrieved successfully
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
 *                     rssFeedItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           image:
 *                             type: string
 *                             example: "https://example.com/image.jpg"
 *                           category:
 *                             type: string
 *                             example: "News"
 *                           language:
 *                             type: string
 *                             example: "English"
 *                           name:
 *                             type: string
 *                             example: "BBC News"
 *                           url:
 *                             type: string
 *                             example: "https://example.com/rss-feed.xml"
 *                           title:
 *                             type: string
 *                             example: "Breaking News"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No RSS feed items found
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
 *                   example: No RSS feed items found
 */

/**
 * @swagger
 * /api/rss/v1/rss/{id}:
 *   put:
 *     summary: Update an RSS feed item
 *     tags: [Rss]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RSS feed item to update
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
 *                 description: The new RSS feed item image to upload
 *               category:
 *                 type: string
 *                 description: The category of the RSS feed item
 *               language:
 *                 type: string
 *                 description: The language of the RSS feed item
 *               name:
 *                 type: string
 *                 description: The name of the RSS feed item
 *               url:
 *                 type: string
 *                 description: The URL of the RSS feed item
 *               title:
 *                 type: string
 *                 description: The title of the RSS feed item
 *     responses:
 *       200:
 *         description: RSS feed item updated successfully
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
 *                   example: RSS feed item updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/new-image.jpg"
 *                     category:
 *                       type: string
 *                       example: "Updated Category"
 *                     language:
 *                       type: string
 *                       example: "Updated Language"
 *                     name:
 *                       type: string
 *                       example: "Updated Name"
 *                     url:
 *                       type: string
 *                       example: "https://example.com/updated-rss-feed.xml"
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: RSS feed item not found
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
 *                   example: RSS feed item not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/rss/v1/rss/{id}:
 *   delete:
 *     summary: Delete an RSS feed item
 *     tags: [Rss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RSS feed item to delete
 *     responses:
 *       200:
 *         description: RSS feed item deleted successfully
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
 *                   example: RSS feed item deleted successfully
 *       404:
 *         description: RSS feed item not found
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
 *                   example: RSS feed item not found
 *     security:
 *       - bearerAuth: []
 */
