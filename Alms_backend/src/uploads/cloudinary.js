const cloudinary = require("cloudinary");
const env = require("dotenv");
env.config();

cloudinary.config({
  cloud_name: "fooddonate",
  api_key: "955777224983721",
  api_secret: "W494DM7nraiDWO3K_Wvgjvn_-XQ",
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
