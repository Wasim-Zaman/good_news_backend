const express = require('express');
const { login, createAdmin } = require('../controllers/admin');

const router = express.Router();

router.use('/', createAdmin);

router.post('/login', login);

module.exports = router;
