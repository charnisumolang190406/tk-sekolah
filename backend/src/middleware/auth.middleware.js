const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("➡️ AUTH MIDDLEWARE");

    const authHeader = req.headers.authorization;

    console.log("HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Token tidak ditemukan",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ TOKEN VALID");

    req.admin = decoded;

    next();

  } catch (err) {
    console.log("❌ AUTH ERROR:", err.message);

    return res.status(403).json({
      message: "Token tidak valid",
    });
  }
};