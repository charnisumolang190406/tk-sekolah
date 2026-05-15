const router = require("express").Router();

const {
  getGaleri,
  createGaleri,
  deleteGaleri,
} = require("../controllers/galeri.controller");

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// TEST
router.get("/", getGaleri);

// DEBUG + CREATE
router.post(
  "/",
  (req, res, next) => {
    console.log("MASUK ROUTE GALERI");
    next();
  },
  auth,
  upload.single("foto"),
  createGaleri
);

// DELETE
router.delete("/:id", auth, deleteGaleri);

module.exports = router;