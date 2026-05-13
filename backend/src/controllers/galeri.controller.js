const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET semua foto
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE FOTO (CLOUDINARY)
exports.createGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: req.file.path, // 👈 INI PENTING (URL CLOUDINARY)
      },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteGaleri = async (req, res) => {
  try {
    await prisma.galeri.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};