/**
 * @swagger
 * tags:
 *   name: Advertisements
 *   description: Advertisement management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Advertisement:
 *       type: object
 *       required:
 *         - advertisementType
 *         - postType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the advertisement
 *         advertisementType:
 *           type: string
 *           description: The type of the advertisement
 *         bannerType:
 *           type: string
 *           description: The type of banner (if applicable)
 *         content:
 *           type: string
 *           description: The content of the advertisement
 *         postType:
 *           type: string
 *           description: The type of post for the advertisement
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           description: The status of the advertisement
 *         image:
 *           type: string
 *           description: The path to the advertisement's image file
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the advertisement was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the advertisement was last updated
 */

/**
 * @swagger
 * /api/advertisement/v1/advertisement:
 *   post:
 *     summary: Create a new advertisement
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - advertisementType
 *               - postType
 *             properties:
 *               advertisementType:
 *                 type: string
 *               bannerType:
 *                 type: string
 *               content:
 *                 type: string
 *               postType:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The advertisement was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/advertisement/v1/advertisements:
 *   get:
 *     summary: Retrieve all advertisements
 *     tags: [Advertisements]
 *     responses:
 *       200:
 *         description: A list of advertisements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: No advertisements found
 */

/**
 * @swagger
 * /api/advertisement/v1/advertisement/{id}:
 *   get:
 *     summary: Get an advertisement by ID
 *     tags: [Advertisements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The advertisement was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: Advertisement not found
 *   put:
 *     summary: Update an advertisement by ID
 *     tags: [Advertisements]
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
 *               advertisementType:
 *                 type: string
 *               bannerType:
 *                 type: string
 *               content:
 *                 type: string
 *               postType:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The advertisement was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Advertisement not found
 *   delete:
 *     summary: Delete an advertisement by ID
 *     tags: [Advertisements]
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
 *         description: The advertisement was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Advertisement not found
 */

/**
 * @swagger
 * /api/advertisement/v1/advertisements/type/{type}:
 *   get:
 *     summary: Get advertisements by type
 *     tags: [Advertisements]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of advertisements of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: No advertisements found for this type
 */

/**
 * @swagger
 * /api/advertisement/v1/advertisements/paginated:
 *   get:
 *     summary: Get paginated advertisements
 *     tags: [Advertisements]
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
 *                     advertisements:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Advertisement'
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
 * /api/advertisement/v1/advertisement/{id}/status:
 *   patch:
 *     summary: Update advertisement status (admin only)
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advertisement ID
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
 *                   $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Advertisement not found
 *       500:
 *         description: Server error
 */
