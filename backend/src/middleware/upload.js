const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "tk-sekolah-galeri",
    upload_preset: "tk_sekolah_unsigned",
  }),
});

const upload = multer({
  storage,
});

module.exports = upload;