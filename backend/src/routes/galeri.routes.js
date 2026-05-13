const router = require("express").Router();
const galeri = require("../controllers/galeri.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// PUBLIC
router.get("/", galeri.getGaleri);

// ADMIN UPLOAD FOTO (CLOUDINARY)
router.post("/", (req,res,next)=>{
  console.log("MASUK ROUTE");
  next();
}, auth, upload.single("foto"), galeri.createGaleri);
router.delete("/:id", auth, galeri.deleteGaleri);

module.exports = router;