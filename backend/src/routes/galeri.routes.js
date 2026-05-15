const router = require("express").Router();
const galeri = require("../controllers/galeri.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// DEBUG BIAR JELAS
router.get("/", galeri.getGaleri);

router.post(
  "/",
  (req, res, next) => {
    console.log("➡️ MASUK ROUTE GALERI");
    next();
  },
  auth,
  upload.single("foto"),
  galeri.createGaleri
);

router.delete("/:id", auth, galeri.deleteGaleri);

module.exports = router;