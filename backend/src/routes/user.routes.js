const router = require("express").Router();
const upload = require("multer")();
const { uploadImage } = require("../controllers/profile.controller");
const { signUp, signIn, logout } = require("../controllers/auth.controller");
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  unfollow,
  follow,
} = require("../controllers/user.controller");

router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getOneUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.post("/uploadImage", upload.single("file"), uploadImage);

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

router.patch("/follow/:id", follow);
router.patch("/unfollow/:id", unfollow);

module.exports = router;
