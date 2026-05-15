const router = require("express").Router();
const galeri = require("../controllers/galeri.controller");

// TEST AMAN DULU (BIAR TIDAK CRASH)
router.get("/", galeri.getGaleri || ((req, res) => res.json([])));

router.post("/", galeri.createGaleri);

router.delete(
  "/:id",
  galeri.deleteGaleri || ((req, res) => res.json({ message: "ok" }))
);

module.exports = router;