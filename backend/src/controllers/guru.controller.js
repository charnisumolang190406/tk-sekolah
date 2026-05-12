const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET semua guru
exports.getAllGuru = async (req, res) => {
  try {
    const data = await prisma.guru.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET 1 guru
exports.getGuruById = async (req, res) => {
  try {
    const data = await prisma.guru.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE guru
exports.createGuru = async (req, res) => {
  try {
    const data = await prisma.guru.create({
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE guru
exports.updateGuru = async (req, res) => {
  try {
    const data = await prisma.guru.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE guru
exports.deleteGuru = async (req, res) => {
  try {
    await prisma.guru.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Guru deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};