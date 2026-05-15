const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../config/cloudinary");

// CREATE
exports.createGaleri = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "File tidak ada",
      });
    }

    // UPLOAD KE CLOUDINARY (PAKAI PATH)
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tk-sekolah-galeri",
    });

    // SIMPAN KE DATABASE
    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: result.secure_url,
      },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};