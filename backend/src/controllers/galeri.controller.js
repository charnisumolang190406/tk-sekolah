const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// GET
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// CREATE
exports.createGaleri = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File tidak ada",
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "tk-sekolah-galeri",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

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