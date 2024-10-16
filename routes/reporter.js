const express = require('express');
const { uploadSingle } = require('multermate');

const reporterController = require('../controllers/reporter');
const authenticate = require('../middleware/isUser');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();
const uploadConfig = {
  destination: 'uploads',
  fileTypes: ['images'],
  filename: 'image',
};

// Create a new reporter
router.post('/reporter', authenticate, uploadSingle(uploadConfig), reporterController.createReporter);

// Get all reporters
router.get('/reporters', reporterController.getReporters);

// Get reporter by ID
router.get('/reporter/:id', reporterController.getReporterById);

// Update reporter by ID
router.put('/reporter/:id', isAdmin, uploadSingle(uploadConfig), reporterController.updateReporterById);

// Delete reporter by ID
router.delete('/reporter/:id', isAdmin, reporterController.deleteReporterById);

// Get paginated reporters
router.get('/reporters/paginated', reporterController.getPaginatedReporters);

// Update reporter status (admin only)
router.patch('/reporter/:id/status', isAdmin, reporterController.updateReporterStatus);

module.exports = router;
