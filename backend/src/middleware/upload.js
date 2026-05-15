const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "tk-sekolah-galeri",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // max 2MB
  },
});

module.exports = upload;