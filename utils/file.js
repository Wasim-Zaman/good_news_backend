const fs = require("fs");
const path = require("path");

/**
 * Deletes a file based on the provided file path.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the file is deleted.
 * @throws {Error} - Throws an error if the file cannot be deleted.
 */
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // Ensure the file path is an absolute path
    const absolutePath = path.resolve(filePath);

    fs.unlink(absolutePath, (err) => {
      if (err) {
        // If there's an error, reject the promise
        console.error(`Error deleting file at ${absolutePath}:`, err);
        reject(new Error(`Unable to delete file at ${absolutePath}`));
      } else {
        // Resolve the promise if file is successfully deleted
        console.log(`File successfully deleted at ${absolutePath}`);
        resolve();
      }
    });
  });
};

module.exports = {
  deleteFile,
};
