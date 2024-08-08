const express = require("express");
const multerConfig = require("multer-configurator");
const controller = require("../controllers/ePaper");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();
const upload = multerConfig.uploadMultiple({
  fields: [
    { name: "media", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ],
});

router.post("/v1/e-papers", isAdmin, upload, controller.createEPaper);

// Get an e-paper by ID
router.get("/v1/e-papers/:id", controller.getEPaperById);

// Get all e-papers
router.get("/v1/e-papers/all", controller.getAllEPapers);

// Get paginated e-papers with optional search query
router.get("/v1/e-papers", controller.getEPapers);

// Update an e-paper by ID
router.put("/v1/e-papers/:id", isAdmin, upload, controller.updateEPaper);

// Delete an e-paper by ID
router.delete("/v1/e-papers/:id", isAdmin, controller.deleteEPaper);

module.exports = router;
