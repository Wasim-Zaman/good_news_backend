const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const response = require('../utils/response');
const JWT = require('../utils/jwt');
const { deleteFile, fileExists } = require('../utils/file');

// Joi validation schema
const userSchema = Joi.object({
  name: Joi.string(),
  mobileNumber: Joi.string().required(),
  fcmToken: Joi.string(),
  timeZone: Joi.string(),
  language: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  constituency: Joi.string().required(),
  mandal: Joi.string().required(),
});

exports.login = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { mobileNumber, fcmToken, timeZone } = value;

    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { mobileNumber },
      include: { reporter: true }, // Include reporter information
    });

    // If the user does not exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          mobileNumber,
          fcmToken: fcmToken ?? '',
          timeZone: timeZone || 'UTC',
          language: value.language,
          state: value.state,
          district: value.district,
          constituency: value.constituency,
          mandal: value.mandal,
        },
        include: { reporter: true }, // Include reporter information
      });
      console.log(`New user created with mobile number: ${mobileNumber}`);
    } else {
      console.log(`User with mobile number: ${mobileNumber} already exists`);
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          fcmToken: fcmToken || user.fcmToken,
          timeZone: timeZone || 'UTC',
        },
        include: { reporter: true }, // Include reporter information
      });
    }

    // Create a JWT token
    const token = JWT.createToken(user, { algorithm: 'HS256' });

    // Return the user data and token
    res.status(200).json(
      response(200, true, 'Login successful', {
        user: user,
        token,
      })
    );
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { mobileNumber } = value;

    // Find the user by mobile number
    let user = await prisma.user.findUnique({
      where: { mobileNumber },
      include: { reporter: true }, // Include reporter information
    });
    if (!user) {
      throw new CustomError('User not found with the provided mobile number', 404);
    }

    // Handle image file upload
    let image = user.image;
    if (req.file) {
      image = req.file.path;
      if (user.image && (await fileExists(user.image))) {
        await deleteFile(user.image);
      }
    }

    // Update user details
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...value,
        image,
      },
      include: { reporter: true }, // Include reporter information
    });

    console.log(`User with mobile number: ${mobileNumber} updated successfully`);

    res.status(200).json(response(200, true, 'User updated successfully', user));
  } catch (error) {
    console.log(`Error in updateUser: ${error.message}`);
    if (req.file && (await fileExists(req.file.path))) {
      await deleteFile(req.file.path);
    }
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = '' } = req.query;
    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [{ name: { contains: query } }, { mobileNumber: { contains: query } }],
        },
        include: { reporter: true }, // Include reporter information
        skip: Number(skip),
        take: Number(limit),
      }),
      prisma.user.count({
        where: {
          OR: [{ name: { contains: query } }, { mobileNumber: { contains: query } }],
        },
      }),
    ]);

    if (!users.length) {
      throw new CustomError('No users found', 404);
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json(
      response(200, true, 'Users retrieved successfully', {
        users,
        currentPage: Number(page),
        totalPages,
        totalCount,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { reporter: true }, // Include reporter information
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    if (user.image) {
      await deleteFile(user.image);
    }
    const deletedUser = await prisma.user.delete({
      where: { id },
      include: { reporter: true }, // Include reporter information
    });
    console.log(`User with id: ${id} deleted successfully`);
    if (!deletedUser) {
      throw new CustomError('Failed to delete user', 500);
    }

    res.status(200).json(response(200, true, 'User deleted successfully', deletedUser));
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError('Unauthorized: No user found in token', 401);
    }

    // Fetch the user with reporter information
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { reporter: true },
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(response(200, true, 'User retrieved successfully', user));
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // Extract data from request body
    const { name, mobileNumber, timeZone, language, state, district, constituency, mandal } = req.body;

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        image: null,
        mobileNumber,
        fcmToken: '',
        timeZone: timeZone || 'UTC',
        language,
        state,
        district,
        constituency,
        mandal,
      },
      include: { reporter: true }, // Include reporter information
    });

    // Return success response
    res.status(201).json(response(201, true, 'User created successfully', newUser));
  } catch (error) {
    next(error);
  }
};
