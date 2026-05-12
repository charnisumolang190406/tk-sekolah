const router = require("express").Router();
const controller = require("../controllers/pengumuman.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", controller.getPengumuman);
router.post("/", auth, controller.createPengumuman);

module.exports = router;