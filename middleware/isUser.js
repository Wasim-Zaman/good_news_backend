const jwt = require('jsonwebtoken');
require('dotenv').config();

const CustomError = require('../utils/customError');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization') || req.get('authorization');

    if (!authHeader) {
      throw new CustomError('Authentication token is missing.', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new CustomError('Invalid authentication token format.', 401);
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new CustomError('Your session has expired. Please log in again.', 401);
      } else {
        throw new CustomError('Invalid authentication token.', 401);
      }
    }

    if (!decodedToken) {
      throw new CustomError('Invalid authentication token.', 401);
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
