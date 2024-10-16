const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const response = require('../utils/response');
const { deleteFile, fileExists } = require('../utils/file');

// Joi validation schema
const reporterSchema = Joi.object({
  name: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  constituency: Joi.string().allow(null, ''),
  mandal: Joi.string().allow(null, ''),
  status: Joi.string().valid('WAITING', 'APPROVED', 'REJECTED').default('APPROVED'),
  userId: Joi.string().required(),
});

// Create a new reporter
exports.createReporter = async (req, res, next) => {
  try {
    const { error, value } = reporterSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const user = await prisma.user.findUnique({ where: { id: value.userId } });
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const newReporter = await prisma.reporter.create({
      data: {
        ...value,
        image: req.file ? req.file.path : null,
        user: { connect: { id: value.userId } },
      },
      include: { user: true },
    });

    res.status(201).json(response(201, true, 'Reporter created successfully', newReporter));
  } catch (error) {
    console.log(`Error in createReporter: ${error.message}`);

    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }

    next(error);
  }
};

// Get all reporters
exports.getReporters = async (req, res, next) => {
  try {
    const reporters = await prisma.reporter.findMany({
      include: { user: true },
    });

    if (!reporters.length) {
      throw new CustomError('No reporters found', 404);
    }

    res.status(200).json(response(200, true, 'Reporters retrieved successfully', reporters));
  } catch (error) {
    console.log(`Error in getReporters: ${error.message}`);
    next(error);
  }
};

// Get reporter by ID
exports.getReporterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reporter = await prisma.reporter.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!reporter) {
      throw new CustomError('Reporter not found', 404);
    }

    res.status(200).json(response(200, true, 'Reporter found successfully', reporter));
  } catch (error) {
    console.log(`Error in getReporterById: ${error.message}`);
    next(error);
  }
};

// Update reporter by ID
exports.updateReporterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = reporterSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const existingReporter = await prisma.reporter.findUnique({ where: { id } });
    if (!existingReporter) {
      throw new CustomError('Reporter not found', 404);
    }

    const user = await prisma.user.findUnique({ where: { id: value.userId } });
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    let updateData = { ...value };
    if (req.file) {
      updateData.image = req.file.path;
      if (existingReporter.image && (await fileExists(existingReporter.image))) {
        await deleteFile(existingReporter.image);
      }
    }

    const updatedReporter = await prisma.reporter.update({
      where: { id },
      data: {
        ...updateData,
        user: { connect: { id: value.userId } },
      },
      include: { user: true },
    });

    res.status(200).json(response(200, true, 'Reporter updated successfully', updatedReporter));
  } catch (error) {
    console.log(`Error in updateReporterById: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

// Delete reporter by ID
exports.deleteReporterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reporter = await prisma.reporter.findUnique({ where: { id } });
    if (!reporter) {
      throw new CustomError('Reporter not found', 404);
    }

    await prisma.reporter.delete({ where: { id } });

    if (reporter.image && (await fileExists(reporter.image))) {
      await deleteFile(reporter.image);
    }

    res.status(200).json(response(200, true, 'Reporter deleted successfully'));
  } catch (error) {
    console.log(`Error in deleteReporterById: ${error.message}`);
    next(error);
  }
};

// Get paginated reporters
exports.getPaginatedReporters = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [reporters, totalCount] = await Promise.all([
      prisma.reporter.findMany({
        skip: Number(skip),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
      prisma.reporter.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json(
      response(200, true, 'Paginated reporters retrieved successfully', {
        reporters,
        currentPage: Number(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    console.log(`Error in getPaginatedReporters: ${error.message}`);
    next(error);
  }
};

// Update reporter status (admin only)
exports.updateReporterStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      throw new CustomError('Invalid status', 400);
    }

    const updatedReporter = await prisma.reporter.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(response(200, true, 'Reporter status updated successfully', updatedReporter));
  } catch (error) {
    console.log(`Error in updateReporterStatus: ${error.message}`);
    next(error);
  }
};
