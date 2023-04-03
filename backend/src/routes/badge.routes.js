const {
  getAllBadges,
  createBadge,
  getOneBadge,
  deleteBadge,
  updateBadge,
} = require("../controllers/badge.controller");

const router = require("express").Router();

router.get("/", getAllBadges);
router.post("/", createBadge);
router.get("/:id", getOneBadge);
router.delete("/:id", deleteBadge);
router.put("/:id", updateBadge);

// router.patch("/vote/:id", vote);
// router.patch("/unvote/:id", unvote);

module.exports = router;
