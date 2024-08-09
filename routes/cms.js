const express = require("express");

const controller = require("../controllers/cms");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("multermate");

const router = express.Router();

// Create a new CMS entry
router.post(
  "/v1/cms",
  isAdmin,
  uploadSingle({ filename: "media" }),
  controller.createCMS
);

// Get a CMS entry by ID
router.get("/v1/cms/:id", controller.getCMSById);

// Get all CMS entries
router.get("/v1/cms/all", controller.getAllCMS);

// Get paginated CMS entries with optional search query
router.get("/v1/cms", controller.getCMS);

// Update a CMS entry by ID
router.put("/v1/cms/:id", isAdmin, uploadSingle("media"), controller.updateCMS);

// Delete a CMS entry by ID
router.delete("/v1/cms/:id", isAdmin, controller.deleteCMS);

module.exports = router;
