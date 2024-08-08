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
 *   name: Ads
 *   description: Ad management
 */

/**
 * @swagger
 * /api/ad/v1/ads:
 *   post:
 *     summary: Create a new ad
 *     tags: [Ads]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: The ad media to upload
 *               title:
 *                 type: string
 *                 example: "Ad Title"
 *                 description: The title of the ad
 *               timestamp:
 *                 type: string
 *                 description: The timestamp for the ad
 *               frequency:
 *                 type: integer
 *                 example: 5
 *                 description: The frequency of the ad
 *     responses:
 *       201:
 *         description: Ad created successfully
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
 *                   example: Ad created successfully
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
 * /api/ad/v1/ads/{id}:
 *   get:
 *     summary: Retrieve an ad by ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ad to retrieve
 *     responses:
 *       200:
 *         description: Ad retrieved successfully
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
 *                   example: Ad retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     media:
 *                       type: string
 *                       example: "https://example.com/media.jpg"
 *                     title:
 *                       type: string
 *                       example: "Ad Title"
 *                     timestamp:
 *                       type: string
 *                       example: "2023-07-24T12:00:00Z"
 *                     frequency:
 *                       type: integer
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Ad not found
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
 *                   example: Ad not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/ad/v1/ads/all:
 *   get:
 *     summary: Retrieve all ads
 *     tags: [Ads]
 *     responses:
 *       200:
 *         description: Ads retrieved successfully
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
 *                   example: Ads retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       media:
 *                         type: string
 *                         example: "https://example.com/media.jpg"
 *                       title:
 *                         type: string
 *                         example: "Ad Title"
 *                       timestamp:
 *                         type: string
 *                         example: "2023-07-24T12:00:00Z"
 *                       frequency:
 *                         type: integer
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No ads found
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
 *                   example: No ads found
 */

/**
 * @swagger
 * /api/ad/v1/ads:
 *   get:
 *     summary: Retrieve paginated ads with optional search query
 *     tags: [Ads]
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
 *         description: The search query to filter ads.
 *     responses:
 *       200:
 *         description: Ads retrieved successfully
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
 *                   example: Ads retrieved successfully
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
 *                     ads:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           media:
 *                             type: string
 *                             example: "https://example.com/media.jpg"
 *                           title:
 *                             type: string
 *                             example: "Ad Title"
 *                           timestamp:
 *                             type: string
 *                             example: "2023-07-24T12:00:00Z"
 *                           frequency:
 *                             type: integer
 *                             example: 5
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No ads found
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
 *                   example: No ads found
 */

/**
 * @swagger
 * /api/ad/v1/ads/{id}:
 *   put:
 *     summary: Update an ad
 *     tags: [Ads]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ad to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: The new ad media to upload
 *               title:
 *                 type: string
 *                 description: The title of the ad
 *               timestamp:
 *                 type: string
 *                 description: The timestamp for the ad
 *               frequency:
 *                 type: integer
 *                 description: The frequency of the ad
 *     responses:
 *       200:
 *         description: Ad updated successfully
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
 *                   example: Ad updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     media:
 *                       type: string
 *                       example: "https://example.com/new-media.jpg"
 *                     title:
 *                       type: string
 *                       example: "New Ad Title"
 *                     timestamp:
 *                       type: string
 *                       example: "2023-07-24T12:00:00Z"
 *                     frequency:
 *                       type: integer
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Ad not found
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
 *                   example: Ad not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/ad/v1/ads/{id}:
 *   delete:
 *     summary: Delete an ad
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ad to delete
 *     responses:
 *       200:
 *         description: Ad deleted successfully
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
 *                   example: Ad deleted successfully
 *       404:
 *         description: Ad not found
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
 *                   example: Ad not found
 *     security:
 *       - bearerAuth: []
 */
