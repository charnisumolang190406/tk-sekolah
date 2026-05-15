const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
exports.getPengumuman = async (req, res) => {
  try {
    const data = await prisma.pengumuman.findMany({
      orderBy: { tanggal: "desc" }
    });

    res.json(data);

  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
};

// CREATE
exports.createPengumuman = async (req, res) => {
  try {
    const { judul, isi } = req.body;

    const data = await prisma.pengumuman.create({
      data: { judul, isi },
    });

    res.json(data);

  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
};