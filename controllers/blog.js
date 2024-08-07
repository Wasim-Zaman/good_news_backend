const Blog = require("../models/blog");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createBlog = async (req, res, next) => {
  try {
    const { title, visibility, publishDateTime, status, type } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    console.log(`Attempting to create blog with title: ${title}`);
    const existingBlog = await Blog.findByTitle(title);
    if (!existingBlog) {
      const blog = await Blog.create({
        image,
        title,
        visibility,
        publishDateTime: new Date(publishDateTime),
        status: Number(status),
        type,
      });
      console.log(`Blog created with title: ${title}`);
      res.status(201).json(generateResponse(201, true, "Blog created", blog));
    } else {
      throw new CustomError("Blog already exists with this title", 400);
    }
  } catch (error) {
    console.log(`Error in createBlog: ${error.message}`);
    next(error);
  }
};

exports.getBlogById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }
    res.status(200).json(generateResponse(200, true, "Blog found", blog));
  } catch (error) {
    console.log(`Error in getBlogById: ${error.message}`);
    next(error);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.getAll();

    if (!blogs.length) {
      throw new CustomError("No blogs found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Blogs retrieved successfully", blogs));
  } catch (error) {
    console.log(`Error in getAllBlogs: ${error.message}`);
    next(error);
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const blogs = await Blog.get(Number(page), Number(limit), query);

    if (!blogs.data.length) {
      throw new CustomError("No blogs found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Blogs retrieved successfully", blogs));
  } catch (error) {
    console.log(`Error in getBlogs: ${error.message}`);
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, visibility, publishDateTime, status, type } = req.body;

  try {
    console.log(`Attempting to update blog with ID: ${id}`);
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }

    let image = req.file ? req.file.path : blog.image;

    if (image && req.file) {
      await fileHelper.deleteFile(blog.image);
    }

    const updatedBlog = await Blog.updateById(id, {
      image,
      title,
      visibility,
      publishDateTime: new Date(publishDateTime),
      status: Number(status),
      type,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "Blog updated", updatedBlog));
  } catch (error) {
    console.log(`Error in updateBlog: ${error.message}`);
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete blog with ID: ${id}`);
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }

    await fileHelper.deleteFile(blog.image);
    await Blog.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Blog deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteBlog: ${error.message}`);
    next(error);
  }
};
