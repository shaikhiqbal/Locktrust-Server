import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const clouinaryService = async (localFilePath) => {
  if (!localFilePath) return { url: "" };

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File uploaded successfully on cloudinary 👍`, response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (e) {
    fs.unlinkSync(localFilePath); // Use promise-based unlink

    console.error("Unable to delete local file ❌", unlinkError);
  }
};

export { clouinaryService };
