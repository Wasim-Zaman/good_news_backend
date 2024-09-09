const express = require("express");

const controller = require("../controllers/ad");
const isAdmin = require("../middleware/is-admin");
const { uploadSingle } = require("multermate");

const router = express.Router();

// Create a new ad
router.post(
  "/v1/ads",
  isAdmin,
  uploadSingle({ filename: "media" }),
  controller.createAd
);

// Get an ad by ID
router.get("/v1/ads/:id", controller.getAdById);

// Get all ads
router.get("/v1/ads/all", controller.getAllAds);

// Get paginated ads with optional search query
router.get("/v1/ads", controller.getAds);

// Update an ad by ID
router.put(
  "/v1/ads/:id",
  isAdmin,
  uploadSingle({ filename: "media" }),
  controller.updateAd
);

// Delete an ad by ID
router.delete("/v1/ads/:id", isAdmin, controller.deleteAd);

module.exports = router;
