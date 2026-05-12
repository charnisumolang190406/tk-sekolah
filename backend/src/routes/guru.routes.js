const router = require("express").Router();
const guruController = require("../controllers/guru.controller");

// CRUD Guru
router.get("/", guruController.getAllGuru);
router.get("/:id", guruController.getGuruById);
router.post("/", guruController.createGuru);
router.put("/:id", guruController.updateGuru);
router.delete("/:id", guruController.deleteGuru);

module.exports = router;