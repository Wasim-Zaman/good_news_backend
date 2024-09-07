const Category = require("../models/category");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createCategory = async (req, res, next) => {
  try {
    const { mainCategory, name, totalBlogs } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    console.log(`Attempting to create category with name: ${name}`);
    const existingCategory = await Category.findByName(name);
    if (!existingCategory) {
      const category = await Category.create({
        image,
        mainCategory,
        name,
        totalBlogs,
      });
      console.log(`Category created with name: ${name}`);
      res
        .status(201)
        .json(generateResponse(201, true, "Category created", category));
    } else {
      throw new CustomError("Category already exists with this name", 400);
    }
  } catch (error) {
    console.log(`Error in createCategory: ${error.message}`);
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Category found", category));
  } catch (error) {
    console.log(`Error in getCategoryById: ${error.message}`);
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.getAll();

    if (!categories.data.length) {
      throw new CustomError("No categories found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Categories retrieved successfully",
          categories
        )
      );
  } catch (error) {
    console.log(`Error in getAllCategories: ${error.message}`);
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const categories = await Category.get(Number(page), Number(limit), query);

    if (!categories.data.length) {
      throw new CustomError("No categories found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Categories retrieved successfully",
          categories
        )
      );
  } catch (error) {
    console.log(`Error in getPaginatedCategories: ${error.message}`);
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { mainCategory, name, totalBlogs } = req.body;

  try {
    console.log(`Attempting to update category with ID: ${id}`);
    const category = await Category.findById(id);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    let image = req.file ? req.file.path : category.image;

    if (image && req.file) {
      await fileHelper.deleteFile(category.image);
    }

    const updatedCategory = await Category.updateCategory(id, {
      image,
      mainCategory,
      name,
      totalBlogs,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "Category updated", updatedCategory));
  } catch (error) {
    console.log(`Error in updateCategory: ${error.message}`);
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete category with ID: ${id}`);
    const category = await Category.findById(id);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    await fileHelper.deleteFile(category.image);
    await Category.deleteCategory(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Category deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteCategory: ${error.message}`);
    next(error);
  }
};
