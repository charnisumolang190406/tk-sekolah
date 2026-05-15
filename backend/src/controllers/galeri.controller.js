const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../config/cloudinary");

// GET ALL
exports.getGaleri = async (req, res) => {
  try {
    const data = await prisma.galeri.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createGaleri = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File tidak ada" });
    }

    const result = await uploadFromBuffer(req.file.buffer);

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: result.secure_url,
      },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const fs = require("fs");

const stream = require("stream");

const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const passthrough = new stream.PassThrough();
    passthrough.end(fileBuffer);

    const cloudStream = cloudinary.uploader.upload_stream(
      { folder: "tk-sekolah-galeri" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    passthrough.pipe(cloudStream);
  });
};

    const data = await prisma.galeri.create({
      data: {
        judul: req.body.judul,
        foto: result.secure_url,
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
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};