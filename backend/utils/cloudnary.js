import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// configure env
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName, // Specify the folder in Cloudinary
    });

    // File uploaded successfully
    console.log("File uploaded to Cloudinary:", response.url);

    // Remove the locally saved temporary file after successful upload
    fs.unlinkSync(localFilePath);

    // Return the response object with Cloudinary details
    return response;
  } catch (error) {
    // Handle error during upload
    console.error("Error uploading file to Cloudinary:", error);

    // Remove the locally saved temporary file if the upload operation failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // Return null in case of error
    return null;
  }
};

export { uploadOnCloudinary };
