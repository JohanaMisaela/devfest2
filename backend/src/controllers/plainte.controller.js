const { isValidObjectId } = require("mongoose");
const Plainte = require("../models/Pleinte");
const User = require("../models/User");

const getAllPlaintes = async (req, res) => {
  const plaintes = await Plainte.find();
  // const plaintes = await Plainte.aggregate([
  //   {
  //     $lookup:
  //     {
  //       from:'User',
  //       localfield: 'posterID',
  //       foreignField: '-id',
  //       as: 'userDetails'
  //     }
  //   }
  // ])
  res.status(200).json({ plaintes });
};

const createPlainte = async (req, res) => {
  const { posterId, quartier, text, type } = req.body;
  const plainte = new Plainte({
    posterId,
    quartier,
    text,
    type,
    voters: [],
  });

  try {
    await plainte.save();
    return res.status(201).json({ plainte });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getOneplainte = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  Plainte.findById(req.params.id, (error, docs) => {
    if (!error) {
      docs
        ? res.send(docs)
        : res.json({ message: "This Plainte has been cleared" });
    } else console.log("ID Inconnu:" + error);
  });
};

// vote
const vote = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Plainte.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { voters: req.body.idvoter },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idvoter,
      {
        $addToSet: { votes: req.params.id },
      },
      { new: true }
    )
      .then((Plainte) => res.send(Plainte))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

const unvote = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Plainte.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { voters: req.body.idvoter },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idvoter,
      {
        $pull: { votes: req.params.id },
      },
      { new: true }
    )
      .then((Plainte) => res.send(Plainte))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  getAllPlaintes,
  createPlainte,
  getOneplainte,
  vote,
  unvote,
};
