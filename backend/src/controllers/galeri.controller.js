const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// GET
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany({
      orderBy: {
        id: "desc",
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

// CREATE
exports.createGaleri = async (req, res) => {
  try {
    console.log("➡️ MASUK CREATE GALERI");

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "File tidak ada",
      });
    }

    // TEST CLOUDINARY SIMPLE
    const hasilUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "tk-sekolah-galeri",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("❌ CLOUDINARY ERROR DETAIL:");
            console.log(JSON.stringify(error, null, 2));

            reject(error);
          } else {
            console.log("✅ CLOUDINARY SUCCESS");
            console.log(result);

            resolve(result);
          }
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(uploadStream);
    });

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: hasilUpload.secure_url,
      },
    });

    res.json(data);

  } catch (err) {
    console.log("❌ ERROR BESAR:");
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
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};