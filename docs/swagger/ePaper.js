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
 *   name: EPaper
 *   description: E-Paper management
 */

/**
 * @swagger
 * /api/ePaper/v1/e-papers:
 *   post:
 *     summary: Create a new e-paper
 *     tags: [EPaper]
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
 *                 description: The media file of the e-paper
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: The PDF file of the e-paper
 *               name:
 *                 type: string
 *                 example: "E-Paper Name"
 *                 description: The name of the e-paper
 *     responses:
 *       201:
 *         description: E-paper created successfully
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
 *                   example: E-paper created successfully
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
 * /api/ePaper/v1/e-papers/{id}:
 *   get:
 *     summary: Retrieve an e-paper by ID
 *     tags: [EPaper]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the e-paper to retrieve
 *     responses:
 *       200:
 *         description: E-paper retrieved successfully
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
 *                   example: E-paper retrieved successfully
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
 *                       example: "E-Paper Name"
 *                     pdf:
 *                       type: string
 *                       example: "PDF Source"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: E-paper not found
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
 *                   example: E-paper not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/ePaper/v1/e-papers/all:
 *   get:
 *     summary: Retrieve all e-papers
 *     tags: [EPaper]
 *     responses:
 *       200:
 *         description: E-papers retrieved successfully
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
 *                   example: E-papers retrieved successfully
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
 *                         example: "E-Paper Name"
 *                       pdf:
 *                         type: string
 *                         example: "PDF Source"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No e-papers found
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
 *                   example: No e-papers found
 */

/**
 * @swagger
 * /api/ePaper/v1/e-papers:
 *   get:
 *     summary: Retrieve paginated e-papers with optional search query
 *     tags: [EPaper]
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
 *         description: The search query to filter e-papers.
 *     responses:
 *       200:
 *         description: E-papers retrieved successfully
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
 *                   example: E-papers retrieved successfully
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
 *                     ePaperItems:
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
 *                             example: "E-Paper Name"
 *                           pdf:
 *                             type: string
 *                             example: "PDF Source"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No e-papers found
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
 *                   example: No e-papers found
 */

/**
 * @swagger
 * /api/ePaper/v1/e-papers/{id}:
 *   put:
 *     summary: Update an e-paper
 *     tags: [EPaper]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the e-paper to update
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
 *                 description: The new media file of the e-paper
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: The new PDF file of the e-paper
 *               name:
 *                 type: string
 *                 description: The name of the e-paper
 *     responses:
 *       200:
 *         description: E-paper updated successfully
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
 *                   example: E-paper updated successfully
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
 *                       example: "E-Paper Name"
 *                     pdf:
 *                       type: string
 *                       example: "PDF Source"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: E-paper not found
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
 *                   example: E-paper not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/ePaper/v1/e-papers/{id}:
 *   delete:
 *     summary: Delete an e-paper
 *     tags: [EPaper]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the e-paper to delete
 *     responses:
 *       200:
 *         description: E-paper deleted successfully
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
 *                   example: E-paper deleted successfully
 *       404:
 *         description: E-paper not found
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
 *                   example: E-paper not found
 *     security:
 *       - bearerAuth: []
 */
