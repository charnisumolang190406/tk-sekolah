const router = require("express").Router();
const galeri = require("../controllers/galeri.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// PUBLIC
router.get("/", galeri.getGaleri);

// ADMIN UPLOAD FOTO
router.post("/", upload.single("foto"), galeri.createGaleri);
router.delete("/:id", galeri.deleteGaleri);

module.exports = router;