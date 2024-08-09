const express = require("express");
const controller = require("../controllers/searchLog");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

// Create a new search log
router.post("/v1/search-logs", isAdmin, controller.createSearchLog);

// Get a search log by ID
router.get("/v1/search-logs/:id", controller.getSearchLogById);

// Get all search logs
router.get("/v1/search-logs/all", controller.getAllSearchLogs);

// Get paginated search logs with optional search query
router.get("/v1/search-logs", controller.getSearchLogs);

// Update a search log by ID
router.put("/v1/search-logs/:id", isAdmin, controller.updateSearchLog);

// Delete a search log by ID
router.delete("/v1/search-logs/:id", isAdmin, controller.deleteSearchLog);

module.exports = router;
