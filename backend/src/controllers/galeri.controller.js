const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE (CLOUDINARY)
exports.createGaleri = async (req, res) => {
  try {
    console.log("=== REQUEST MASUK ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "req.file kosong",
      });
    }

    console.log("PATH:", req.file.path);

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: req.file.path,
      },
    });

    res.json(data);

  } catch (err) {
    console.log("=== ERROR ===");
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
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