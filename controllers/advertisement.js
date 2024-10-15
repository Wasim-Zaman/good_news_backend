const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const response = require('../utils/response');
const { deleteFile, fileExists } = require('../utils/file');

// Joi validation schema
const advertisementSchema = Joi.object({
  advertisementType: Joi.string().required(),
  bannerType: Joi.string().allow(null, ''),
  content: Joi.string().allow(null, ''),
  postType: Joi.string().required(),
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').default('PENDING'),
});

// Create a new advertisement
exports.createAdvertisement = async (req, res, next) => {
  try {
    const { error, value } = advertisementSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const newAdvertisement = await prisma.advertisement.create({
      data: {
        ...value,
        image: req.file ? req.file.path : null,
      },
    });

    res.status(201).json(response(201, true, 'Advertisement created successfully', newAdvertisement));
  } catch (error) {
    console.log(`Error in createAdvertisement: ${error.message}`);

    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }

    next(error);
  }
};

// Get all advertisements
exports.getAdvertisements = async (req, res, next) => {
  try {
    const advertisements = await prisma.advertisement.findMany();

    if (!advertisements.length) {
      throw new CustomError('No advertisements found', 404);
    }

    res.status(200).json(response(200, true, 'Advertisements retrieved successfully', advertisements));
  } catch (error) {
    console.log(`Error in getAdvertisements: ${error.message}`);
    next(error);
  }
};

// Get advertisement by ID
exports.getAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const advertisement = await prisma.advertisement.findUnique({
      where: { id },
    });

    if (!advertisement) {
      throw new CustomError('Advertisement not found', 404);
    }

    res.status(200).json(response(200, true, 'Advertisement found successfully', advertisement));
  } catch (error) {
    console.log(`Error in getAdvertisementById: ${error.message}`);
    next(error);
  }
};

// Update advertisement by ID
exports.updateAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = advertisementSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const existingAdvertisement = await prisma.advertisement.findUnique({ where: { id } });
    if (!existingAdvertisement) {
      throw new CustomError('Advertisement not found', 404);
    }

    let updateData = { ...value };
    if (req.file) {
      updateData.image = req.file.path;
      if (existingAdvertisement.image && (await fileExists(existingAdvertisement.image))) {
        await deleteFile(existingAdvertisement.image);
      }
    }

    const updatedAdvertisement = await prisma.advertisement.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(response(200, true, 'Advertisement updated successfully', updatedAdvertisement));
  } catch (error) {
    console.log(`Error in updateAdvertisementById: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

// Delete advertisement by ID
exports.deleteAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const advertisement = await prisma.advertisement.findUnique({ where: { id } });
    if (!advertisement) {
      throw new CustomError('Advertisement not found', 404);
    }

    await prisma.advertisement.delete({ where: { id } });

    if (advertisement.image && (await fileExists(advertisement.image))) {
      await deleteFile(advertisement.image);
    }

    res.status(200).json(response(200, true, 'Advertisement deleted successfully'));
  } catch (error) {
    console.log(`Error in deleteAdvertisementById: ${error.message}`);
    next(error);
  }
};

// Get all advertisements by type
exports.getAdvertisementsByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const advertisements = await prisma.advertisement.findMany({
      where: { advertisementType: type },
    });

    if (!advertisements.length) {
      throw new CustomError('No advertisements found for this type', 404);
    }

    res.status(200).json(response(200, true, 'Advertisements retrieved successfully', advertisements));
  } catch (error) {
    console.log(`Error in getAdvertisementsByType: ${error.message}`);
    next(error);
  }
};

// Get paginated advertisements
exports.getPaginatedAdvertisements = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [advertisements, totalCount] = await Promise.all([
      prisma.advertisement.findMany({
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.advertisement.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json(
      response(200, true, 'Paginated advertisements retrieved successfully', {
        advertisements,
        currentPage: Number(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    console.log(`Error in getPaginatedAdvertisements: ${error.message}`);
    next(error);
  }
};

// Update advertisement status (admin only)
exports.updateAdvertisementStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      throw new CustomError('Invalid status', 400);
    }

    const updatedAdvertisement = await prisma.advertisement.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(response(200, true, 'Advertisement status updated successfully', updatedAdvertisement));
  } catch (error) {
    console.log(`Error in updateAdvertisementStatus: ${error.message}`);
    next(error);
  }
};
