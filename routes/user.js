const express = require("express");

const controller = require("../controllers/user");
const isAdmin = require("../middleware/is-admin");

const { uploadSingle } = require("../config/multer");

const router = express.Router();

// User login
router.post("/v1/users/login", controller.login);

// Create a new user
router.post("/v1/users", isAdmin, controller.createUser);

// Get a user by ID (requires token)
router.get("/v1/users/me", controller.getUser);

// Get all users with optional search query and pagination
router.get("/v1/users", isAdmin, controller.getUsers);

// Update a user by mobile number
router.put("/v1/users", isAdmin, uploadSingle(), controller.updateUser);

// Delete a user by ID
router.delete("/v1/users/:id", isAdmin, controller.deleteUser);

module.exports = router;
