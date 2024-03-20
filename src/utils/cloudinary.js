import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Using promises version of fs for async/await
// Load environment variables from .env file
dotenv.config({
  path: "../.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Check if localFilePath is provided
    if (!localFilePath) {
      throw new Error("Local file path is required");
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Remove the locally saved temporary file
    await fs.unlink(localFilePath);

    // Return the Cloudinary response
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error uploading file to Cloudinary:", error.message);

    // Remove the locally saved temporary file if exists
    if (localFilePath) {
      try {
        await fs.unlink(localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting local file:", unlinkError.message);
      }
    }

    // Return null to indicate failure
    return null;
  }
};

export { uploadOnCloudinary };
