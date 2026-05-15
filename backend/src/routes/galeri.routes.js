const router = require("express").Router();

const {
  getGaleri,
  createGaleri,
  deleteGaleri,
} = require("../controllers/galeri.controller");

// HAPUS middleware dulu buat test
router.get("/", getGaleri);

router.post("/", createGaleri);

router.delete("/:id", deleteGaleri);

module.exports = router;