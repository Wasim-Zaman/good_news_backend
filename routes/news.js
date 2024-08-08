const express = require("express");

const controller = require("../controllers/news");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("../config/multer");

const router = express.Router();

// Create a new news item
router.post("/v1/news", isAdmin, uploadSingle("image"), controller.createNews);

// Get a news item by ID
router.get("/v1/news/:id", controller.getNewsById);

// Get all news items
router.get("/v1/news/all", controller.getAllNews);

// Get paginated news items with optional search query
router.get("/v1/news", controller.getNews);

// Update a news item by ID
router.put(
  "/v1/news/:id",
  isAdmin,
  uploadSingle("image"),
  controller.updateNews
);

// Delete a news item by ID
router.delete("/v1/news/:id", isAdmin, controller.deleteNews);

module.exports = router;
