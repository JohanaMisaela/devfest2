const router = require("express").Router();
const multer = require("multer");
const {
  getAllActu,
  createActu,
  getOneActu,
  updateActu,
  deleteActu,
} = require("../controllers/actu.controller");
const upload = multer();

router.get("/", getAllActu);
router.get("/:id", getOneActu);
router.post("/", upload.single("file"), createActu);
router.put("/:id", updateActu);
router.delete("/:id", deleteActu);

module.exports = router;
