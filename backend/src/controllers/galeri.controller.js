const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET semua foto (PUBLIC)
exports.getGaleri = async (req, res) => {
  const data = await prisma.galeri.findMany();
  res.json(data);
};

// TAMBAH FOTO (ADMIN)
exports.createGaleri = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file); // 👈 ini penting

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: req.file.filename,
      },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// HAPUS FOTO (ADMIN)
exports.deleteGaleri = async (req, res) => {
  await prisma.galeri.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "deleted" });
};