const express = require("express");

const controller = require("../controllers/liveNews");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

// Create a new live news item
router.post("/v1/live-news", isAdmin, controller.createLiveNews);

// Get a live news item by ID
router.get("/v1/live-news/:id", controller.getLiveNewsById);

// Get all live news items
router.get("/v1/live-news/all", controller.getAllLiveNews);

// Get paginated live news items with optional search query
router.get("/v1/live-news", controller.getLiveNews);

// Update a live news item by ID
router.put("/v1/live-news/:id", isAdmin, controller.updateLiveNews);

// Delete a live news item by ID
router.delete("/v1/live-news/:id", isAdmin, controller.deleteLiveNews);

module.exports = router;
