const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "tk-sekolah-galeri",
      resource_type: "auto",
    };
  },
});

const upload = multer({
  storage,
});

module.exports = upload;