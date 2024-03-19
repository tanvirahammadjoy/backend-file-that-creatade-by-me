import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndrefreshTokens = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing wrong while generating refresh and access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  try {
    // Extract necessary information from request body
    // const { fullName, email, username, password } = req.body;
    const { username, email, fullName, avatar, password } = req.body;
    //console.log("email: ", email);

    // Check if any required field is empty
    // if (
    //   [fullName, email, username, password].some((field) => field?.trim() === "")
    // ) {
    //   throw new ApiError(400, "All fields are required");
    // }
    const requiredFields = [username, email, fullName, avatar, password];
    if (requiredFields.some((field) => !field)) {
      return res.status(401).json({ error: "All fields are required" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      fullName,
      avatar,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate access and refresh tokens for the new user
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    // Return success response with tokens
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { registerUser };
