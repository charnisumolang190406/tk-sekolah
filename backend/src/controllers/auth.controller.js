const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN (sekali saja)
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = await prisma.admin.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN ADMIN
exports.login = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: req.body.username },
    });

    if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

    const valid = await bcrypt.compare(req.body.password, admin.password);

    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};