const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET (PUBLIC)
exports.getPengumuman = async (req, res) => {
  const data = await prisma.pengumuman.findMany({
    orderBy: { tanggal: "desc" }
  });

  res.json(data);
};

// CREATE (ADMIN)
exports.createPengumuman = async (req, res) => {
  const { judul, isi } = req.body;

  const data = await prisma.pengumuman.create({
    data: { judul, isi },
  });

  res.json(data);
};