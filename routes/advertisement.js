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
router.post('/v1/advertisement', isAuth, uploadSingle(uploadConfig), adController.createAdvertisement);
router.get('/v1/advertisements', adController.getAdvertisements);
router.get('/v1/advertisement/:id', adController.getAdvertisementById);
router.put('/v1/advertisement/:id', isAuth, uploadSingle(uploadConfig), adController.updateAdvertisementById);
router.delete('/v1/advertisement/:id', isAdmin, adController.deleteAdvertisementById);
router.get('/v1/advertisements/type/:type', adController.getAdvertisementsByType);
router.get('/v1/advertisements/paginated', adController.getPaginatedAdvertisements);
router.patch('/v1/advertisement/:id/status', isAuth, isAdmin, adController.updateAdvertisementStatus);

module.exports = router;
