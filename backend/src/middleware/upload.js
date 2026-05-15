const multer = require("multer");

// pakai memory supaya aman di Render + Cloudinary stream
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB biar aman
  },
});

module.exports = upload;