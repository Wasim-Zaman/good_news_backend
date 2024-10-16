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

// Post routes
router.post('/post', isAuth, uploadSingle(uploadConfig), postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/post/:id', postController.getPostById);
router.put('/post/:id', isAuth, uploadSingle(uploadConfig), postController.updatePostById);
router.delete('/post/:id', isAdmin, postController.deletePostById);
router.get('/posts/type/:type', postController.getPostsByType);
router.post('/post/:id/view', postController.addPostView);
router.get('/posts/paginated', postController.getPaginatedPosts);
router.patch('/post/:id/status', isAuth, isAdmin, postController.updatePostStatus);

module.exports = router;
