const router = require("express").Router();
const muridController = require("../controllers/murid.controller");
const auth = require("../middleware/auth.middleware");

// publik
router.get("/", muridController.getAllMurid);
router.get("/:id", muridController.getMuridById);

// protected (ADMIN SAJA)
router.post("/", auth, muridController.createMurid);
router.put("/:id", auth, muridController.updateMurid);
router.delete("/:id", auth, muridController.deleteMurid);

module.exports = router;