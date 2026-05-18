const router = require("express").Router();

const galeri = require("../controllers/galeri.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

router.get("/", galeri.getGaleri);

router.post(
  "/",

  (req, res, next) => {
    console.log("➡️ MASUK ROUTE GALERI");
    next();
  },

  (req, res, next) => {
    console.log("➡️ SEBELUM AUTH");
    next();
  },

  auth,

  (req, res, next) => {
    console.log("✅ LOLOS AUTH");
    next();
  },

  upload.single("foto"),

  (req, res, next) => {
    console.log("✅ LOLOS MULTER");
    next();
  },

  galeri.createGaleri
);

router.delete("/:id", auth, galeri.deleteGaleri);

module.exports = router;