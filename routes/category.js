const express = require("express");

const controller = require("../controllers/category");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("../config/multer");

const router = express.Router();

// Create a new category
router.post(
  "/v1/categories",
  isAdmin,
  uploadSingle("image"),
  controller.createCategory
);

// Get a category by ID
router.get("/v1/categories/:id", controller.getCategoryById);

// Get all categories
router.get("/v1/categories/all", controller.getAllCategories);

// Get paginated categories with optional search query
router.get("/v1/categories", controller.getCategories);

// Update a category by ID
router.put(
  "/v1/categories/:id",
  isAdmin,
  uploadSingle("image"),
  controller.updateCategory
);

// Delete a category by ID
router.delete("/v1/categories/:id", isAdmin, controller.deleteCategory);

module.exports = router;
