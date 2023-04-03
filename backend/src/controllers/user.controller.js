const { isValidObjectId } = require("mongoose");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-pwd");
  res.status(200).json({ users });
};

const getOneUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  User.findById(req.params.id, (error, docs) => {
    if (!error) {
      docs
        ? res.send(docs)
        : res.json({ message: "This user has been quicked" });
    } else console.log("ID Inconnu:" + error);
  }).select("-pwd");
};

const deleteUser = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.deleteOne({ _id: req.params.id }).exec();
    res
      .status(200)
      .json({ message: req.params.id + "Was deleted successfilly." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  const {
    name,
    email,
    pwd,
    bio,
    firstname,
    picture,
    quartier,
    status,
    age,
    nettoyage,
    trieDechet,
    reboisement,
    recyclage,
  } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name,
        firstname,
        age,
        picture,
        quartier,
        status,
        pwd,
        nettoyage,
        trieDechet,
        reboisement,
        recyclage,
        bio,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  )
    .then((data) => res.status(201).json({ message: "User updated !", data }))
    .catch((error) => res.status(400).json({ error }));
};

const follow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id, //parametre du function
      { $addToSet: { following: req.body.idToFollow } }, //id de la pers suivi
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json({ message: err }));

    // add to following list
    await User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => req.status(400).json({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const unfollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json({ message: err }));
    // remove to following list
    await User.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  follow,
  unfollow,
  updateUser,
};
