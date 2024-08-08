const path = require("path");
const multer = require("multer");

const CustomError = require("../utils/customError");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Changed from "images" to "uploads" to generalize for both images and videos
  },
  filename: (req, file, cb) => {
    // Sanitize the filename
    const sanitizedFilename = file.originalname.replace(/\\/g, "/");
    const extension = path.extname(sanitizedFilename);
    const fieldName = file.fieldname || "file"; // Changed from "image" to "file" to generalize
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
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        "Invalid file type. Only image and video files are allowed."
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
});

const uploadSingle = (fieldname = "file") => upload.single(fieldname);

const uploadMultiple = (fieldname = "files", maxCount = 10) =>
  upload.array(fieldname, maxCount);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
