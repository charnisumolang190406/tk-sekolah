require("dotenv").config({
  path: __dirname + "/../.env",
});

const cloudinary = require("cloudinary").v2;

console.log("ENV:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET ? "ADA" : "KOSONG",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("TEST CLOUDINARY");

cloudinary.api.ping((error, result) => {
  if (error) {
    console.log("ERROR:");
    console.log(error);
  } else {
    console.log("SUCCESS:");
    console.log(result);
  }
});