const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// CREATE
exports.createGaleri = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({
        message: "File tidak masuk",
      });
    }

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: req.file.path,
      },
    });

    res.json(data);

  } catch (err) {
    console.log("=== ERROR GALERI ===");
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
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "deleted",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};