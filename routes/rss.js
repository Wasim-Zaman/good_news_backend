const express = require("express");

const controller = require("../controllers/rss");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("../config/multer");

const router = express.Router();

// Create a new RSS feed item
router.post("/v1/rss", isAdmin, uploadSingle("image"), controller.createRss);

// Get an RSS feed item by ID
router.get("/v1/rss/:id", controller.getRssById);

// Get all RSS feed items
router.get("/v1/rss/all", controller.getAllRss);

// Get paginated RSS feed items with optional search query
router.get("/v1/rss", controller.getRss);

// Update an RSS feed item by ID
router.put("/v1/rss/:id", isAdmin, uploadSingle("image"), controller.updateRss);

// Delete an RSS feed item by ID
router.delete("/v1/rss/:id", isAdmin, controller.deleteRss);

module.exports = router;
