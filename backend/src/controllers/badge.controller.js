const { isValidObjectId } = require("mongoose");
const Badge = require("../models/Badge");
const User = require("../models/User");

const getAllBadges = async (req, res) => {
  const badges = await Badge.find();
  res.status(200).json({ badges });
};

const createBadge = async (req, res) => {
  const { reboisement, recyclage, trieDechet, nettoyage } = req.body;

  try {
    const badge = await Badge.create({
      reboisement,
      recyclage,
      trieDechet,
      nettoyage,
    });

    await User.findByIdAndUpdate(
      req.body.idUser,
      {
        $set: { idBadge: (await badge)._id },
      },
      { new: true }
    )
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getOneBadge = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  Badge.findById(req.params.id, (error, docs) => {
    if (!error) {
      docs
        ? res.send(docs)
        : res.json({ message: "This user has been quicked" });
    } else console.log("ID Inconnu:" + error);
  });
};

const deleteBadge = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Badge.findByIdAndRemove(req.params.id).catch((err) =>
      res.json({ err })
    );
    await User.findByIdAndUpdate(
      req.body.idUser,
      {
        $set: { idBadge: "" },
      },
      { new: true }
    )
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

const updateBadge = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const { reboisement, recyclage, trieDechet, nettoyage } = req.body;

  Badge.findByIdAndUpdate(
    req.params.id,
    { $set: { reboisement, recyclage, trieDechet, nettoyage } },
    { new: true },
    (err, post) => {
      if (!err) res.send(post);
      else console.log("Update error : " + err);
    }
  );
};

module.exports = {
  getAllBadges,
  createBadge,
  getOneBadge,
  deleteBadge,
  updateBadge,
};
