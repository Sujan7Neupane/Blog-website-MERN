import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary directly (no temp files)
 * @param {Buffer} fileBuffer - the file data in memory
 * @param {string} filename - optional public_id for Cloudinary
 * @returns Cloudinary response object
 */
const uploadOnCloudinary = (fileBuffer, filename = Date.now().toString()) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Push the buffer to the Cloudinary upload stream
    stream.end(fileBuffer);
  });
};

export default uploadOnCloudinary;
