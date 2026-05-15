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
    console.log("1 ROUTE OK");
    next();
  },
  (req, res, next) => {
    console.log("2 AUTH SKIP TEST");
    next();
  },
  (req, res, next) => {
    console.log("3 UPLOAD SKIP TEST");
    next();
  },
  (req, res) => {
    res.json({ message: "TEST OK" });
  }
);

// DELETE
router.delete("/:id", auth, deleteGaleri);

module.exports = router;