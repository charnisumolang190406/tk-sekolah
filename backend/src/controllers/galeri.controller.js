const streamifier = require("streamifier");

exports.createGaleri = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ada" });
    }

    const streamUpload = () => {
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
    res.status(500).json({ error: err.message });
  }
};