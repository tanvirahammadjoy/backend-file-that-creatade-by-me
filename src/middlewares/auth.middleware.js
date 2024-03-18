// Importing necessary modules and utilities
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"; // Importing JWT library for token verification
import User from "../models/user.model.js"; // Importing the User model

// Middleware function to verify JWT token
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Extracting JWT token from cookies or Authorization header
    const token =
      req.cookies?.accessToken || // Check if token is in cookies
      req.header("Authorization")?.replace("Bearer", ""); // Check if token is in Authorization header

    console.log(token); // Logging the token (for debugging)

    // If token doesn't exist, throw unauthorized error
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verifying the JWT token using the secret key
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET, // Secret key for JWT verification
    );

    // Finding the user associated with the decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken", // Excluding sensitive information like password and refreshToken
    );

    // If user doesn't exist, throw invalid token error
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // Attach user object to the request for further processing
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during JWT verification
    // You might want to handle and log the error appropriately here
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
