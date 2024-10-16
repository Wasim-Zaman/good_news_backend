const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const response = require('../utils/response');
const { deleteFile, fileExists } = require('../utils/file');

// Updated Joi validation schema
const postSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('PUBLISHED', 'REJECTED', 'PENDING').required(),
  language: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
});

// Get all posts (paginated with search)
exports.getAllPosts = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    const where = search
      ? {
          OR: [
            { type: { contains: search } },
            { description: { contains: search } },
            { language: { contains: search } },
            { state: { contains: search } },
            { district: { contains: search } },
          ],
        }
      : {};

    if (page && size) {
      const skip = (parseInt(page) - 1) * parseInt(size);
      const [posts, totalCount] = await Promise.all([
        prisma.post.findMany({
          where,
          include: { reporter: true, views: true },
          skip,
          take: parseInt(size),
          orderBy: { createdAt: 'desc' },
        }),
        prisma.post.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / parseInt(size));

      res.status(200).json(
        response(200, true, 'Posts retrieved successfully', {
          posts,
          currentPage: parseInt(page),
          totalPages,
          totalCount,
        })
      );
    } else {
      const posts = await prisma.post.findMany({
        where,
        include: { reporter: true, views: true },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json(response(200, true, 'All posts retrieved successfully', posts));
    }
  } catch (error) {
    console.log(`Error in getAllPosts: ${error.message}`);
    next(error);
  }
};

// Get filtered posts
exports.getFilteredPosts = async (req, res, next) => {
  try {
    const { page = 1, size = 10, ...filters } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);

    const where = Object.entries(filters).reduce((acc, [key, value]) => {
      if (['type', 'language', 'state', 'district'].includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { reporter: true, views: true },
        skip,
        take: parseInt(size),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(size));

    res.status(200).json(
      response(200, true, 'Filtered posts retrieved successfully', {
        posts,
        currentPage: parseInt(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    console.log(`Error in getFilteredPosts: ${error.message}`);
    next(error);
  }
};

// Get posts for specific reporter
exports.getReporterPosts = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);

    const reporter = await prisma.reporter.findUnique({ where: { userId: req.user.id } });
    if (!reporter) {
      throw new CustomError('Reporter not found', 404);
    }

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where: { reporterId: reporter.id },
        include: { reporter: true, views: true },
        skip,
        take: parseInt(size),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.count({ where: { reporterId: reporter.id } }),
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(size));

    res.status(200).json(
      response(200, true, 'Reporter posts retrieved successfully', {
        posts,
        currentPage: parseInt(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    console.log(`Error in getReporterPosts: ${error.message}`);
    next(error);
  }
};

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const reporter = await prisma.reporter.findUnique({ where: { userId: req.user.id } });
    if (!reporter) {
      throw new CustomError('Reporter not found', 404);
    }

    const newPost = await prisma.post.create({
      data: {
        ...value,
        image: req.file ? req.file.path : null,
        reporterId: reporter.id,
      },
      include: { reporter: true, views: true },
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

// Update post
exports.updatePost = async (req, res, next) => {
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

    const reporter = await prisma.reporter.findUnique({ where: { userId: req.user.id } });
    if (!reporter || existingPost.reporterId !== reporter.id) {
      throw new CustomError('Unauthorized to update this post', 403);
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
      include: { reporter: true, views: true },
    });

    res.status(200).json(response(200, true, 'Post updated successfully', updatedPost));
  } catch (error) {
    console.log(`Error in updatePost: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const reporter = await prisma.reporter.findUnique({ where: { userId: req.user.id } });
    if (!reporter || post.reporterId !== reporter.id) {
      throw new CustomError('Unauthorized to delete this post', 403);
    }

    await prisma.postView.deleteMany({ where: { postId: id } });
    await prisma.post.delete({ where: { id } });

    if (post.image && (await fileExists(post.image))) {
      await deleteFile(post.image);
    }

    res.status(200).json(response(200, true, 'Post deleted successfully'));
  } catch (error) {
    console.log(`Error in deletePost: ${error.message}`);
    next(error);
  }
};

// View post
exports.viewPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { reporter: true, views: true },
    });

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the user has already viewed this post
    const existingView = await prisma.postView.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: userId,
        },
      },
    });

    if (!existingView) {
      // If the user hasn't viewed the post, create a new view
      await prisma.postView.create({
        data: {
          postId: id,
          userId: userId,
        },
      });
    }

    // Get the updated view count
    const viewCount = await prisma.postView.count({
      where: { postId: id },
    });

    res.status(200).json(
      response(200, true, 'Post viewed successfully', {
        ...post,
        viewCount,
      })
    );
  } catch (error) {
    console.log(`Error in viewPost: ${error.message}`);
    next(error);
  }
};

// Like a post
exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const likedBy = JSON.parse(post.likedBy);
    const dislikedBy = JSON.parse(post.dislikedBy);

    let updatedLikedBy, updatedDislikedBy, likeCount, dislikeCount;

    if (likedBy.includes(userId)) {
      // User already liked, so remove the like
      updatedLikedBy = likedBy.filter((id) => id !== userId);
      likeCount = post.likeCount - 1;
      dislikeCount = post.dislikeCount;
      updatedDislikedBy = dislikedBy;
    } else {
      // Add new like
      updatedLikedBy = [...likedBy, userId];
      likeCount = post.likeCount + 1;
      // Remove from dislikedBy if present
      updatedDislikedBy = dislikedBy.filter((id) => id !== userId);
      dislikeCount = updatedDislikedBy.length < dislikedBy.length ? post.dislikeCount - 1 : post.dislikeCount;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        likedBy: JSON.stringify(updatedLikedBy),
        dislikedBy: JSON.stringify(updatedDislikedBy),
        likeCount,
        dislikeCount,
      },
    });

    res.status(200).json(response(200, true, 'Post like status updated successfully', updatedPost));
  } catch (error) {
    console.log(`Error in likePost: ${error.message}`);
    next(error);
  }
};

// Dislike a post
exports.dislikePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const likedBy = JSON.parse(post.likedBy);
    const dislikedBy = JSON.parse(post.dislikedBy);

    let updatedLikedBy, updatedDislikedBy, likeCount, dislikeCount;

    if (dislikedBy.includes(userId)) {
      // User already disliked, so remove the dislike
      updatedDislikedBy = dislikedBy.filter((id) => id !== userId);
      dislikeCount = post.dislikeCount - 1;
      likeCount = post.likeCount;
      updatedLikedBy = likedBy;
    } else {
      // Add new dislike
      updatedDislikedBy = [...dislikedBy, userId];
      dislikeCount = post.dislikeCount + 1;
      // Remove from likedBy if present
      updatedLikedBy = likedBy.filter((id) => id !== userId);
      likeCount = updatedLikedBy.length < likedBy.length ? post.likeCount - 1 : post.likeCount;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        likedBy: JSON.stringify(updatedLikedBy),
        dislikedBy: JSON.stringify(updatedDislikedBy),
        likeCount,
        dislikeCount,
      },
    });

    res.status(200).json(response(200, true, 'Post dislike status updated successfully', updatedPost));
  } catch (error) {
    console.log(`Error in dislikePost: ${error.message}`);
    next(error);
  }
};

// Comment on a post
exports.commentOnPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        userId,
      },
    });

    res.status(201).json(response(201, true, 'Comment added successfully', newComment));
  } catch (error) {
    console.log(`Error in commentOnPost: ${error.message}`);
    next(error);
  }
};

// Get comments for a post
exports.getPostComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    });

    const totalComments = await prisma.comment.count({ where: { postId: id } });

    res.status(200).json(
      response(200, true, 'Comments retrieved successfully', {
        comments,
        currentPage: Number(page),
        totalPages: Math.ceil(totalComments / limit),
        totalComments,
      })
    );
  } catch (error) {
    console.log(`Error in getPostComments: ${error.message}`);
    next(error);
  }
};

// Report a post
exports.reportPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const newReport = await prisma.report.create({
      data: {
        reason,
        postId: id,
        userId,
      },
    });

    res.status(201).json(response(201, true, 'Post reported successfully', newReport));
  } catch (error) {
    console.log(`Error in reportPost: ${error.message}`);
    next(error);
  }
};

// Get reports for a post
exports.getPostReports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const reports = await prisma.report.findMany({
      where: { postId: id },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    });

    const totalReports = await prisma.report.count({ where: { postId: id } });

    res.status(200).json(
      response(200, true, 'Reports retrieved successfully', {
        reports,
        currentPage: Number(page),
        totalPages: Math.ceil(totalReports / limit),
        totalReports,
      })
    );
  } catch (error) {
    console.log(`Error in getPostReports: ${error.message}`);
    next(error);
  }
};

// Download a post
exports.downloadPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const downloadedBy = JSON.parse(post.downloadedBy);
    const updatedDownloadedBy = [...new Set([...downloadedBy, userId])];

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        downloadedBy: JSON.stringify(updatedDownloadedBy),
        downloadCount: updatedDownloadedBy.length,
      },
    });

    res.status(200).json(response(200, true, 'Post downloaded successfully', updatedPost));
  } catch (error) {
    console.log(`Error in downloadPost: ${error.message}`);
    next(error);
  }
};
