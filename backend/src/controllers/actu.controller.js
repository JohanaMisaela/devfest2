const { isValidObjectId } = require("mongoose");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const Actualite = require("../models/Actualite");
const { uploadErrors } = require("../utils/error.utils");

const getAllActu = async (req, res) => {
  const actualites = await Actualite.find();
  res.status(200).json({ actualites });
};

const createActu = async (req, res) => {
  const { idUser, titre, text } = req.body;
  let fileName;
  if (req.file !== null) {
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = idUser + Date.now() + ".jpg";
    console.log("Actuality created :" + fileName);

    await writeFile(
      join(__dirname, `../../../frontend/public/images/actualites`, fileName),
      req.file.buffer
    ).catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "failed", err });
    });
  }

  const actu = new Actualite({
    idUser,
    titre,
    text,
    image: req.file !== null ? "./images/actualites/" + fileName : "",
  });

  try {
    const actualite = await actu.save();
    return res.status(201).json({ actualite });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getOneActu = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }
  Actualite.findById(req.params.id, (error, docs) => {
    if (!error) {
      docs
        ? res.send(docs)
        : res.json({ message: "This actuality has been deleted" });
    } else console.log("ID Inconnu:" + error);
  });
};

const updateActu = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    titre: req.body.titre,
    text: req.body.text,
    type: req.body.type,
  };

  Actualite.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, actualite) => {
      if (!err) res.send(actualite);
      else console.log("Update error : " + err);
    }
  );
};

const deleteActu = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  Actualite.findByIdAndRemove(req.params.id, (err, actualite) => {
    if (!err) res.json({ message: "delete successful☻", actualite });
    else console.log("Delete actuality Error: " + err);
  });
};

module.exports = {
  getAllActu,
  createActu,
  getOneActu,
  updateActu,
  deleteActu,
};
