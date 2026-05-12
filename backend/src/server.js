const express = require("express");
const cors = require("cors");
require("dotenv").config();

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
app.use("/uploads", express.static("uploads"));
app.use("/api/pengumuman", require("./routes/pengumuman.routes"));

app.get("/", (req, res) => {
  res.send("API TK Negeri Pembina Siau Timur aktif");
});

app.listen(5000, () => {
  console.log("Server jalan di port 5000");
});