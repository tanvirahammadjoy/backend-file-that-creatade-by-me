import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

  // Get user details from the request body
  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  // Validate that all required fields are provided
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if a user with the same email or username already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  // Check if an avatar file is provided in the request
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // or

  // Check if a cover image file is provided in the request
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // Validate that an avatar file is provided
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar and cover image files to Cloudinary
  const avatarUploadResponse = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUploadResponse =
    await uploadOnCloudinary(coverImageLocalPath);

  // Validate that the avatar file is successfully uploaded
  if (!avatarUploadResponse) {
    throw new ApiError(500, "Failed to upload avatar file to Cloudinary");
  }
  // Use avatarUploadResponse and coverImageUploadResponse to obtain the URLs for avatar and cover image

  // Create a new user object and save it to the database
  const user = await User.create({
    fullName,
    avatar: avatarUploadResponse.url,
    coverImage: coverImageUploadResponse?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Find the newly created user from the database and exclude sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // Validate that the user is successfully created
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return success response with the created user details
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };
