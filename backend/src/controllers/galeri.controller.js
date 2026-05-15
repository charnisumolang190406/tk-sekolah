const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// GET GALERI
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE GALERI (UPLOAD CLOUDINARY AMAN RENDER)
exports.createGaleri = async (req, res) => {
  try {
    console.log("➡️ MASUK CREATE GALERI");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "tk-sekolah-galeri" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadToCloudinary();

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: result.secure_url,
      },
    });

    res.json(data);
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE GALERI
exports.deleteGaleri = async (req, res) => {
  try {
    await prisma.galeri.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};