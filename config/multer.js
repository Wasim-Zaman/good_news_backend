const path = require("path");
const multer = require("multer");

const CustomError = require("../utils/customError");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // replace \\ with /
    const sanitizedFilename = file.originalname.replace(/\\/g, "/");
    cb(null, `${Date.now()}${path.extname(sanitizedFilename)}`);
  },
});

// File filter to check MIME types for all image types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new CustomError("Invalid file type. Only image files are allowed."),
      false
    );
  }
};

// Configure Multer middleware
const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
}).single("image");

const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit per image
}).array("images", 10); // 10 is the maximum number of images

module.exports = {
  uploadSingle,
  uploadMultiple,
};
