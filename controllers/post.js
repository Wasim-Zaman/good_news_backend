const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');
const path = require('path');

const CustomError = require('../utils/error');
const response = require('../utils/response');
const { deleteFile, moveFile, fileExists, ensureDirectoryExists } = require('../utils/file');

// Joi validation schema
const postSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('PUBLISHED', 'REJECTED', 'PENDING').required(),
});

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const newPost = await prisma.post.create({
      data: {
        ...value,
        image: req.file ? req.file.path : null,
      },
    });

    res.status(201).json(response(201, true, 'Post created successfully', newPost));
  } catch (error) {
    console.log(`Error in createPost: ${error.message}`);

    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }

    next(error);
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { views: true },
    });

    if (!posts.length) {
      throw new CustomError('No posts found', 404);
    }

    res.status(200).json(response(200, true, 'Posts retrieved successfully', posts));
  } catch (error) {
    console.log(`Error in getPosts: ${error.message}`);
    next(error);
  }
};

// Get post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: { views: true },
    });

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    res.status(200).json(response(200, true, 'Post found successfully', post));
  } catch (error) {
    console.log(`Error in getPostById: ${error.message}`);
    next(error);
  }
};

// Update post by ID
exports.updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new CustomError('Post not found', 404);
    }

    let updateData = { ...value };
    if (req.file) {
      updateData.image = req.file.path;
      if (existingPost.image && (await fileExists(existingPost.image))) {
        await deleteFile(existingPost.image);
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
      include: { views: true },
    });

    res.status(200).json(response(200, true, 'Post updated successfully', updatedPost));
  } catch (error) {
    console.log(`Error in updatePostById: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

// Delete post by ID
exports.deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    await prisma.postView.deleteMany({ where: { postId: id } });
    await prisma.post.delete({ where: { id } });

    if (post.image && (await fileExists(post.image))) {
      await deleteFile(post.image);
    }

    res.status(200).json(response(200, true, 'Post deleted successfully'));
  } catch (error) {
    console.log(`Error in deletePostById: ${error.message}`);
    next(error);
  }
};

// Get all posts by type
exports.getPostsByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const posts = await prisma.post.findMany({
      where: { type },
      include: { views: true },
    });

    if (!posts.length) {
      throw new CustomError('No posts found for this type', 404);
    }

    res.status(200).json(response(200, true, 'Posts retrieved successfully', posts));
  } catch (error) {
    console.log(`Error in getPostsByType: ${error.message}`);
    next(error);
  }
};

// Add a view to a post
exports.addPostView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('User ID is required', 400);
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const view = await prisma.postView.create({
      data: {
        postId: id,
        userId,
      },
    });

    res.status(201).json(response(201, true, 'View added successfully', view));
  } catch (error) {
    console.log(`Error in addPostView: ${error.message}`);
    next(error);
  }
};
