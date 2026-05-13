const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET semua murid
exports.getAllMurid = async (req, res) => {
  try {
    const data = await prisma.murid.findMany();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET murid by ID
exports.getMuridById = async (req, res) => {
  try {
    const data = await prisma.murid.findUnique({
      where: { id: Number(req.params.id) },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE murid (FIX UTAMA DI SINI)
exports.createMurid = async (req, res) => {
  try {
    const { nama, umur, kelas } = req.body;

    console.log("REQ BODY:", req.body);

    if (!nama || !umur || !kelas) {
      return res.status(400).json({
        message: "Nama, umur, dan kelas wajib diisi",
      });
    }

    const data = await prisma.murid.create({
      data: {
        nama,
        umur: Number(umur), // wajib int
        kelas,
      },
    });

    res.json(data);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE murid
exports.updateMurid = async (req, res) => {
  try {
    const { nama, umur, kelas } = req.body;

    const data = await prisma.murid.update({
      where: { id: Number(req.params.id) },
      data: {
        nama,
        umur: umur ? Number(umur) : undefined,
        kelas,
      },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE murid
exports.deleteMurid = async (req, res) => {
  try {
    await prisma.murid.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Murid deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};