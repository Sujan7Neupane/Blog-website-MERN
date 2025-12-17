import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePathOrBuffer, filename) => {
  try {
    const result = await cloudinary.uploader.upload(filePathOrBuffer, {
      resource_type: "auto",
      public_id: filename,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default uploadOnCloudinary;
