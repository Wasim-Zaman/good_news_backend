const express = require('express');
const { uploadSingle } = require('multermate');

const postController = require('../controllers/post');
const isAuth = require('../middleware/isUser');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();
const uploadConfig = {
  destination: 'uploads',
  fileTypes: ['images'],
  filename: 'image',
};

// Get all posts (paginated with search)
router.get('/posts', postController.getAllPosts);

// Get filtered posts
router.get('/posts/filter', postController.getFilteredPosts);

// Get posts for specific reporter
router.get('/posts/reporter', isAuth, postController.getReporterPosts);

// Create a new post
router.post('/post', isAuth, uploadSingle(uploadConfig), postController.createPost);

// Get a single post
router.get('/post/:id', isAuth, postController.viewPost);

// Update post
router.put('/post/:id', isAuth, uploadSingle(uploadConfig), postController.updatePost);

// Delete post
router.delete('/post/:id', isAuth, postController.deletePost);

// Post interactions
router.post('/post/:id/like', isAuth, postController.likePost);
router.post('/post/:id/dislike', isAuth, postController.dislikePost);
router.post('/post/:id/comment', isAuth, postController.commentOnPost);
router.post('/post/:id/report', isAuth, postController.reportPost);
router.get('/post/:id/download', isAuth, postController.downloadPost);

module.exports = router;
