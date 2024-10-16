const express = require('express');

const controller = require('../controllers/user');
const isAdmin = require('../middleware/is-admin');

const { uploadSingle } = require('../config/multer');

const router = express.Router();

// User login
router.post('/users/login', controller.login);

// Create a new user
router.post('/users', isAdmin, controller.createUser);

// Get a user by ID (requires token)
router.get('/users/me', controller.getUser);

// Get all users with optional search query and pagination
router.get('/users', isAdmin, controller.getUsers);

// Update a user by mobile number
router.put('/users', isAdmin, uploadSingle(), controller.updateUser);

// Delete a user by ID
router.delete('/users/:id', isAdmin, controller.deleteUser);

module.exports = router;
