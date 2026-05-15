const router = require("express").Router();

const galeriController = require("../controllers/galeri.controller");

console.log("CTRL:", galeriController);

router.get("/", galeriController.getGaleri);

router.post("/", galeriController.createGaleri);

router.delete("/:id", galeriController.deleteGaleri);

module.exports = router;