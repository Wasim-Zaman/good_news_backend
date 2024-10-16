const express = require('express');
const router = express.Router();
const reporterController = require('../controllers/reporter');
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

// Create a new reporter
router.post('/reporter', authenticate, upload.single('image'), reporterController.createReporter);

// Get all reporters
router.get('/reporters', reporterController.getReporters);

// Get reporter by ID
router.get('/reporter/:id', reporterController.getReporterById);

// Update reporter by ID
router.put('/reporter/:id', authenticate, upload.single('image'), reporterController.updateReporterById);

// Delete reporter by ID
router.delete('/reporter/:id', authenticate, reporterController.deleteReporterById);

// Get paginated reporters
router.get('/reporters/paginated', reporterController.getPaginatedReporters);

// Update reporter status (admin only)
router.patch('/reporter/:id/status', authenticate, reporterController.updateReporterStatus);

module.exports = router;
