const express = require('express');
const { uploadSingle } = require('multermate');

const adController = require('../controllers/advertisement');
const isAuth = require('../middleware/isUser');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();
const uploadConfig = {
  destination: 'uploads',
  fileTypes: ['images'],
  filename: 'image',
};

// Advertisement routes
router.post('/advertisement', isAuth, uploadSingle(uploadConfig), adController.createAdvertisement);
router.get('/advertisements', adController.getAdvertisements);
router.get('/advertisement/:id', adController.getAdvertisementById);
router.put('/advertisement/:id', isAuth, uploadSingle(uploadConfig), adController.updateAdvertisementById);
router.delete('/advertisement/:id', isAdmin, adController.deleteAdvertisementById);
router.get('/advertisements/type/:type', adController.getAdvertisementsByType);
router.get('/advertisements/paginated', adController.getPaginatedAdvertisements);
router.patch('/advertisement/:id/status', isAuth, isAdmin, adController.updateAdvertisementStatus);

module.exports = router;
