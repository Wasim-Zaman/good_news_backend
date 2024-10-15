const express = require('express');
const { uploadSingle } = require('multermate');

const postController = require('../controllers/post');
const isAuth = require('../middleware/isUser');

const router = express.Router();
const uploadConfig = {
  destination: 'uploads',
  fileTypes: ['images'],
  filename: 'image',
};

// Post routes
router.post('/v1/post', isAuth, uploadSingle(uploadConfig), postController.createPost);
router.get('/v1/posts', postController.getPosts);
router.get('/v1/post/:id', postController.getPostById);
router.put('/v1/post/:id', isAuth, uploadSingle(uploadConfig), postController.updatePostById);
router.delete('/v1/post/:id', isAuth, postController.deletePostById);
router.get('/v1/posts/type/:type', postController.getPostsByType);
router.post('/v1/post/:id/view', postController.addPostView);

module.exports = router;
