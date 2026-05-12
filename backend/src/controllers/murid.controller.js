const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET semua murid
exports.getAllMurid = async (req, res) => {
  try {
    const data = await prisma.murid.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET 1 murid
exports.getMuridById = async (req, res) => {
  try {
    const data = await prisma.murid.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE murid
exports.createMurid = async (req, res) => {
  try {
    const data = await prisma.murid.create({
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE murid
exports.updateMurid = async (req, res) => {
  try {
    const data = await prisma.murid.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE murid
exports.deleteMurid = async (req, res) => {
  try {
    await prisma.murid.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Murid deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};