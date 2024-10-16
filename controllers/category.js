const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');
const { deleteFile, fileExists } = require('../utils/file');

// Joi validation schema
const categorySchema = Joi.object({
  name: Joi.string().required(),
  mainCategory: Joi.string().allow(null, ''),
});

exports.createCategory = async (req, res, next) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    if (!req.file) {
      throw new CustomError('Image is required', 400);
    }

    const newCategory = await prisma.category.create({
      data: {
        ...value,
        image: req.file.path,
      },
    });

    res.status(201).json(generateResponse(201, true, 'Category created successfully', newCategory));
  } catch (error) {
    console.log(`Error in createCategory: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    res.status(200).json(generateResponse(200, true, 'Category found successfully', category));
  } catch (error) {
    console.log(`Error in getCategoryById: ${error.message}`);
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories.length) {
      throw new CustomError('No categories found', 404);
    }
    res.status(200).json(generateResponse(200, true, 'Categories retrieved successfully', categories));
  } catch (error) {
    console.log(`Error in getAllCategories: ${error.message}`);
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = '' } = req.query;
    const skip = (page - 1) * limit;

    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where: {
          OR: [{ name: { contains: query } }, { mainCategory: { contains: query } }],
        },
        skip: Number(skip),
        take: Number(limit),
      }),
      prisma.category.count({
        where: {
          OR: [{ name: { contains: query } }, { mainCategory: { contains: query } }],
        },
      }),
    ]);

    if (!categories.length) {
      throw new CustomError('No categories found', 404);
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json(
      generateResponse(200, true, 'Categories retrieved successfully', {
        categories,
        currentPage: Number(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    console.log(`Error in getCategories: ${error.message}`);
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
      throw new CustomError('Category not found', 404);
    }

    let updateData = { ...value };
    if (req.file) {
      updateData.image = req.file.path;
      if (existingCategory.image && (await fileExists(existingCategory.image))) {
        await deleteFile(existingCategory.image);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(generateResponse(200, true, 'Category updated successfully', updatedCategory));
  } catch (error) {
    console.log(`Error in updateCategory: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }

    await prisma.category.delete({ where: { id } });

    if (category.image && (await fileExists(category.image))) {
      await deleteFile(category.image);
    }

    res.status(200).json(generateResponse(200, true, 'Category deleted successfully'));
  } catch (error) {
    console.log(`Error in deleteCategory: ${error.message}`);
    next(error);
  }
};
