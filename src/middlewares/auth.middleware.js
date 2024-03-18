// Importing necessary modules and utilities
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"; // Importing JWT library for token verification
import User from "../models/user.model.js"; // Importing the User model

// The purpose of the provided code is to create a middleware function named verifyJWT that verifies JSON Web Tokens (JWT) in incoming requests. Here's a breakdown of its purpose:
// Middleware function to verify JWT token
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // 1. Token Extraction: The code extracts the JWT token from either the accessToken cookie or the Authorization header. If the token is not found in either location, it throws an unauthorized error.
    // Extracting JWT token from cookies or Authorization header
    const token =
      req.cookies?.accessToken || // Check if token is in cookies
      req.header("Authorization")?.replace("Bearer", ""); // Check if token is in Authorization header

    console.log(token); // Logging the token (for debugging)

    // If token doesn't exist, throw unauthorized error
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // 2. Token Verification: Once the token is extracted, it is verified using the jwt.verify method provided by the jsonwebtoken library. This method decodes and verifies the JWT token using a secret key (process.env.chai-aur-code-withe-tanvir). If the token is invalid or expired, it throws an error.
    // Verifying the JWT token using the secret key
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET, // Secret key for JWT verification
    );

    // 3. User Retrieval: After successfully verifying the token, the code retrieves the user associated with the token from the database using the User.findById method. It excludes sensitive information like the password and refreshToken from the user object.
    // Finding the user associated with the decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken", // Excluding sensitive information like password and refreshToken
    );

    // 4. Error Handling: The code handles any errors that occur during token verification or user retrieval. If an error occurs, it may log the error for debugging purposes.
    // If user doesn't exist, throw invalid token error
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // 5. Request Modification: If the token is valid and the associated user is found, the user object is attached to the request (req.user) for further processing by downstream middleware or route handlers.
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

// Overall, the purpose of this code is to ensure that incoming requests have valid JWT tokens and to extract information about the authenticated user from those tokens. This is a common pattern used for securing endpoints in web applications.
