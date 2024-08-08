const express = require("express");
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/ePaper");
const isAdmin = require("../middleware/is-admin");
const CustomError = require("../utils/customError");

const router = express.Router();

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Generalized for both images and videos
  },
  filename: (req, file, cb) => {
    // Sanitize the filename
    const sanitizedFilename = file.originalname.replace(/\\/g, "/");
    const extension = path.extname(sanitizedFilename);
    const fieldName = file.fieldname || "file"; // Generalized field name
    const fileName = `${Date.now()}-${fieldName}${extension}`;
    cb(null, fileName);
  },
});

// File filter to check MIME types for image and video types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/avi",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        "Invalid file type. Only image, video, and PDF files are allowed."
      ),
      false
    );
  }
};

// Configure Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50MB file size limit
}).fields([
  { name: "media", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]);

// Create a new e-paper
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
