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
 *   name: SearchLog
 *   description: Search Log management
 */

/**
 * @swagger
 * /api/searchLogs/v1/search-logs:
 *   post:
 *     summary: Create a new search log
 *     tags: [SearchLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchLog:
 *                 type: string
 *                 description: The search term to log
 *                 example: "example search term"
 *               count:
 *                 type: integer
 *                 description: The number of times the term was searched
 *                 example: 19
 *               searchDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time the search was logged
 *                 example: "2023-09-27T05:59:00.000Z"
 *     responses:
 *       201:
 *         description: Search log created successfully
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
 *                   example: Search log created successfully
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
 * /api/searchLogs/v1/search-logs/{id}:
 *   get:
 *     summary: Retrieve a search log by ID
 *     tags: [SearchLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the search log to retrieve
 *     responses:
 *       200:
 *         description: Search log retrieved successfully
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
 *                   example: Search log retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     searchLog:
 *                       type: string
 *                       example: "example search term"
 *                     count:
 *                       type: integer
 *                       example: 19
 *                     searchDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T05:59:00.000Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T05:59:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T06:00:00.000Z"
 *       404:
 *         description: Search log not found
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
 *                   example: Search log not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/searchLogs/v1/search-logs/all:
 *   get:
 *     summary: Retrieve all search logs
 *     tags: [SearchLog]
 *     responses:
 *       200:
 *         description: Search logs retrieved successfully
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
 *                   example: Search logs retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       searchLog:
 *                         type: string
 *                         example: "example search term"
 *                       count:
 *                         type: integer
 *                         example: 19
 *                       searchDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-27T05:59:00.000Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-27T05:59:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-27T06:00:00.000Z"
 *       404:
 *         description: No search logs found
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
 *                   example: No search logs found
 */

/**
 * @swagger
 * /api/searchLogs/v1/search-logs:
 *   get:
 *     summary: Retrieve paginated search logs with optional search query
 *     tags: [SearchLog]
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
 *         description: The search query to filter search logs.
 *     responses:
 *       200:
 *         description: Search logs retrieved successfully
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
 *                   example: Search logs retrieved successfully
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
 *                     searchLogItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           searchLog:
 *                             type: string
 *                             example: "example search term"
 *                           count:
 *                             type: integer
 *                             example: 19
 *                           searchDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-09-27T05:59:00.000Z"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-09-27T05:59:00.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-09-27T06:00:00.000Z"
 *       404:
 *         description: No search logs found
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
 *                   example: No search logs found
 */

/**
 * @swagger
 * /api/searchLogs/v1/search-logs/{id}:
 *   put:
 *     summary: Update a search log
 *     tags: [SearchLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the search log to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchLog:
 *                 type: string
 *                 description: The updated search term
 *                 example: "updated search term"
 *               count:
 *                 type: integer
 *                 description: The updated count of searches
 *                 example: 20
 *               searchDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated date and time of the search
 *                 example: "2023-09-27T06:00:00.000Z"
 *     responses:
 *       200:
 *         description: Search log updated successfully
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
 *                   example: Search log updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     searchLog:
 *                       type: string
 *                       example: "updated search term"
 *                     count:
 *                       type: integer
 *                       example: 20
 *                     searchDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T06:00:00.000Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T05:59:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-27T06:00:00.000Z"
 *       404:
 *         description: Search log not found
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
 *                   example: Search log not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/searchLogs/v1/search-logs/{id}:
 *   delete:
 *     summary: Delete a search log
 *     tags: [SearchLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the search log to delete
 *     responses:
 *       200:
 *         description: Search log deleted successfully
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
 *                   example: Search log deleted successfully
 *       404:
 *         description: Search log not found
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
 *                   example: Search log not found
 *     security:
 *       - bearerAuth: []
 */
