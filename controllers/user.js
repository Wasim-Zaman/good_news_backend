const User = require("../models/user");
const CustomError = require("../utils/error");
const response = require("../utils/response");
const JWT = require("../utils/jwt");
const fileHelper = require("../utils/file");

exports.login = async (req, res, next) => {
  try {
    const { mobileNumber, fcmToken, timeZone } = req.body;

    if (!mobileNumber) {
      throw new CustomError("Mobile number is required", 400);
    }

    // Check if the user already exists
    let user = await User.findByMobileNumber(mobileNumber);

    // If the user does not exist, create a new user
    if (!user) {
      user = await User.create({
        mobileNumber,
        fcmToken: fcmToken ?? "",
        timeZone: timeZone || "UTC",
      });
      console.log(`New user created with mobile number: ${mobileNumber}`);
    } else {
      console.log(`User with mobile number: ${mobileNumber} already exists`);
      user = await User.updateById(user.id, {
        fcmToken: fcmToken || user.fcmToken,
        timeZone: timeZone || "UTC",
      });
    }

    // Create a JWT token
    const token = JWT.createToken(user, (options = { algorithm: "HS256" }));

    // Return the user data and token
    res.status(200).json(
      response(200, true, "Login successful", {
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
  const { name, mobileNumber } = req.body;

  try {
    // Find the user by mobile number
    let user = await User.findByMobileNumber(mobileNumber);
    if (!user) {
      throw new CustomError(
        "User not found with the provided mobile number",
        404
      );
    }

    console.log(req.file);
    // Handle image file upload
    let image = req.file ? req.file.path : user.image;

    if (req.file) {
      if (user.image) await fileHelper.deleteFile(user.image);
    }

    // Update user details
    user = await User.updateById(user.id, {
      name: name || user.name,
      image,
    });

    console.log(
      `User with mobile number: ${mobileNumber} updated successfully`
    );

    res
      .status(200)
      .json(response(200, true, "User updated successfully", user));
  } catch (error) {
    console.log(`Error in updateUser: ${error.message}`);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const result = await User.get(Number(page), Number(limit), query);
    if (!result || result.users.length === 0) {
      throw new CustomError("No users found", 404);
    }

    res
      .status(200)
      .json(response(200, true, "Users retrieved successfully", result));
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (user.image) {
      await fileHelper.deleteFile(user.image);
    }
    const deletedUser = await User.deleteById(id);
    console.log(`User with id: ${id} deleted successfully`);
    if (!deletedUser) {
      throw new CustomError("Failed to delete user", 500);
    }

    res
      .status(200)
      .json(response(200, true, "User deleted successfully", deletedUser));
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized: No user found in token", 401);
    }

    res
      .status(200)
      .json(response(200, true, "User retrieved successfully", req.user));
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // Extract data from request body
    const { name, mobileNumber, timeZone } = req.body;

    // Create the new user
    const newUser = await User.create({
      name,
      image: null,
      mobileNumber,
      fcmToken: "",
      timeZone: timeZone || "UTC",
    });

    // Return success response
    res
      .status(201)
      .json(response(201, true, "User created successfully", newUser));
  } catch (error) {
    next(error);
  }
};
