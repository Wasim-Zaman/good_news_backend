/**
 * @swagger
 * tags:
 *   name: Reporters
 *   description: Reporter management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reporter:
 *       type: object
 *       required:
 *         - name
 *         - state
 *         - district
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the reporter
 *         name:
 *           type: string
 *           description: The name of the reporter
 *         image:
 *           type: string
 *           description: The path to the reporter's image file
 *         state:
 *           type: string
 *           description: The state of the reporter
 *         district:
 *           type: string
 *           description: The district of the reporter
 *         constituency:
 *           type: string
 *           description: The constituency of the reporter (optional)
 *         mandal:
 *           type: string
 *           description: The mandal of the reporter (optional)
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           description: The status of the reporter
 *         userId:
 *           type: string
 *           description: The ID of the associated user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the reporter was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the reporter was last updated
 */

/**
 * @swagger
 * /api/reporter/v1/reporter:
 *   post:
 *     summary: Create a new reporter
 *     tags: [Reporters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - state
 *               - district
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               constituency:
 *                 type: string
 *               mandal:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The reporter was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reporter'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/reporter/v1/reporters:
 *   get:
 *     summary: Retrieve all reporters
 *     tags: [Reporters]
 *     responses:
 *       200:
 *         description: A list of reporters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reporter'
 *       404:
 *         description: No reporters found
 */

/**
 * @swagger
 * /api/reporter/v1/reporter/{id}:
 *   get:
 *     summary: Get a reporter by ID
 *     tags: [Reporters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The reporter was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reporter'
 *       404:
 *         description: Reporter not found
 *   put:
 *     summary: Update a reporter by ID
 *     tags: [Reporters]
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
 *               name:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               constituency:
 *                 type: string
 *               mandal:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The reporter was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reporter'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reporter not found
 *   delete:
 *     summary: Delete a reporter by ID
 *     tags: [Reporters]
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
 *         description: The reporter was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reporter not found
 */

/**
 * @swagger
 * /api/reporter/v1/reporters/paginated:
 *   get:
 *     summary: Get paginated reporters
 *     tags: [Reporters]
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
 *                     reporters:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Reporter'
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
 * /api/reporter/v1/reporter/{id}/status:
 *   patch:
 *     summary: Update reporter status (admin only)
 *     tags: [Reporters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reporter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
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
 *                   $ref: '#/components/schemas/Reporter'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Reporter not found
 *       500:
 *         description: Server error
 */
