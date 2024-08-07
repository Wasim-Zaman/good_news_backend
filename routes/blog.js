const express = require("express");

const controller = require("../controllers/blog");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("../config/multer");

const router = express.Router();

// Create a new blog
router.post("/v1/blogs", isAdmin, uploadSingle, controller.createBlog);

// Get a blog by ID
router.get("/v1/blogs/:id", controller.getBlogById);

// Get all blogs
router.get("/v1/blogs/all", controller.getAllBlogs);

// Get paginated blogs with optional search query
router.get("/v1/blogs", controller.getBlogs);

// Update a blog by ID
router.put("/v1/blogs/:id", isAdmin, uploadSingle, controller.updateBlog);

// Delete a blog by ID
router.delete("/v1/blogs/:id", isAdmin, controller.deleteBlog);

module.exports = router;
