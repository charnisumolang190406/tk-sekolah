require("dotenv").config({
  path: __dirname + "/../../.env",
});

const cloudinary = require("cloudinary").v2;

console.log("CLOUD TEST:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET ? "ADA" : "KOSONG",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

module.exports = cloudinary;