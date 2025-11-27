import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Local file uploaded successfully!");

    // Delete local file after upload
    fs.unlinkSync(localFilePath);
    console.log("Local file deleted!");

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    // Try deleting local file if it exists
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted due to error");
    }

    return null;
  }
};

export default uploadOnCloudinary;
