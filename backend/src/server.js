const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const app = express();

// =====================
// DEBUG CLOUDINARY ENV
// =====================
console.log("CLOUD TEST:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET ? "OK" : "MISSING",
});

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// serve uploads folder
app.use("/uploads", express.static("uploads"));

// auto create uploads folder
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
});

// =====================
// ROUTES
// =====================
const muridRoutes = require("./routes/murid.routes");
const guruRoutes = require("./routes/guru.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/murid", muridRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/galeri", require("./routes/galeri.routes"));
app.use("/api/pengumuman", require("./routes/pengumuman.routes"));

// =====================
// ROOT
// =====================
app.get("/", (req, res) => {
  res.send("API TK Negeri Pembina Siau Timur aktif");
});

// =====================
// GLOBAL ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.log("===== GLOBAL ERROR =====");
  console.log(err);
  console.log("MESSAGE:", err.message);
  console.log("STACK:", err.stack);

  res.status(500).json({
    error: err.message,
  });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});