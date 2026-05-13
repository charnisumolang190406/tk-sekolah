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
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "File tidak masuk (cek FormData / multer / field foto)",
      });
    }

    const fotoUrl = req.file.path || req.file.secure_url;

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: fotoUrl,
      },
    });

    return res.json(data);
  } catch (err) {
    console.log("ERROR CREATE GALERI:", err);

    return res.status(500).json({
      error: err.message,
      detail: err,
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