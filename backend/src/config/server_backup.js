const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const muridRoutes = require("./routes/murid.routes");
app.use("/api/murid", muridRoutes);

app.get("/", (req, res) => {
  res.send("API TK Negeri Pembina Siau Timur aktif");
});

app.listen(process.env.PORT, () => {
  console.log("Server jalan di port " + process.env.PORT);
});