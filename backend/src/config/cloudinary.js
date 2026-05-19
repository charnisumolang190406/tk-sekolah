require("dotenv").config({
  path: __dirname + "/../../.env",
});

const cloudinary = require("cloudinary").v2;

// Cloudinary otomatis baca CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

console.log("CLOUD TEST:", {
  name: cloudinary.config().cloud_name,
  key: cloudinary.config().api_key,
  secret: cloudinary.config().api_secret ? "ADA" : "KOSONG",
});

module.exports = cloudinary;