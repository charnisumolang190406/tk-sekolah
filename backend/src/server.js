const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const muridRoutes = require("./routes/murid.routes");
const guruRoutes = require("./routes/guru.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/murid", muridRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/galeri", require("./routes/galeri.routes"));
app.use("/api/pengumuman", require("./routes/pengumuman.routes"));

app.get("/", (req, res) => {
  res.send("API TK Negeri Pembina Siau Timur aktif");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err);

  res.status(500).json({
    error: err.message,
  });
});