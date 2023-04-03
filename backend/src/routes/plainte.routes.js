const router = require("express").Router();
const {
  getAllPlaintes,
  createPlainte,
  getOneplainte,
  unvote,
  vote,
} = require("../controllers/plainte.controller");

router.get("/", getAllPlaintes);
router.get("/:id", getOneplainte);
router.post("/", createPlainte);

router.patch("/vote/:id", vote);
router.patch("/unvote/:id", unvote);

module.exports = router;
