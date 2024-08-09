const express = require("express");

const controller = require("../controllers/liveNews");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("multermate");

const router = express.Router();

// Create a new live news
router.post(
  "/v1/live-news",
  isAdmin,
  uploadSingle({ filename: "media" }),
  controller.createLiveNews
);

// Get a live news by ID
router.get("/v1/live-news/:id", controller.getLiveNewsById);

// Get all live news
router.get("/v1/live-news/all", controller.getAllLiveNews);

// Get paginated live news with optional search query
router.get("/v1/live-news", controller.getLiveNews);

// Update a live news by ID
router.put(
  "/v1/live-news/:id",
  isAdmin,
  uploadSingle("media"),
  controller.updateLiveNews
);

// Delete a live news by ID
router.delete("/v1/live-news/:id", isAdmin, controller.deleteLiveNews);

module.exports = router;
