const { join } = require("path");
const { writeFile } = require("fs/promises");
const { uploadErrors } = require("../utils/error.utils");
const User = require("../models/User");

module.exports.uploadImage = async (req, res) => {
  try {
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.userName + ".jpg";
  try {
    await writeFile(
      join(__dirname, "../../frontend/public/images/profiles", fileName),
      req.file.buffer
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "failed", err });
  }

  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { image: "./images/profiles/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
