const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "tk-sekolah-galeri",
    format: "jpg",
    resource_type: "image",
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;