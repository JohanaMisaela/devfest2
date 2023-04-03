const Post = require("../models/Post");
const User = require("../models/User");
const { uploadErrors } = require("../utils/error.utils");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const { isValidObjectId } = require("mongoose");

module.exports.readPost = (req, res) => {
  Post.find((err, post) => {
    if (!err) res.json({ post });
    else console.log("Errors to get data : " + err);
  }).sort({ createdAt: -1 });
};
module.exports.createPost = async (req, res) => {
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
    fileName = req.body.posterId + Date.now() + ".jpg";
    console.log("Post created" + fileName);

    await writeFile(
      join(__dirname, `../../frontend/public/images/posts`, fileName),
      req.file.buffer
    )
      // .then((res) => res.send({ message: "ok" }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "failed", err });
      });
  }

  const newPost = new Post({
    posterId: req.body.posterId,
    isEvent: req.body.isEvent,
    isPlainte: req.body.isPlainte,
    type: req.body.type,
    text: req.body.text,
    quartier: req.body.quartier,
    image: req.file !== null ? "./images/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json({ post });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.updatePost = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    text: req.body.text,
    quartier: req.body.quartier,
    type: req.body.type,
  };

  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, post) => {
      if (!err) res.send(post);
      else console.log("Update error : " + err);
    }
  );
};
module.exports.deletePost = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  Post.findByIdAndRemove(req.params.id, (err, post) => {
    if (!err) res.send(post);
    else console.log("Delete post Error: " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.idLiker },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idLiker,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((post) => res.send(post))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.idLiker },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idLiker,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((post) => res.send(post))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          // $push => n'ecrase pas le tableau mais ajout dans le tab
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((post) => res.json({ post }))
      .catch((err) => res.status(400).json({ err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return Post.findById(req.params.id, (err, post) => {
      const theComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment)
        return res.status(404).send("Comment not found" + theComment);
      theComment.text = req.body.text;

      return post.save((err) => {
        if (!err) return res.status(200).send(post);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.deleteCommentPost = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// FOLLOW
module.exports.follow = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { followers: req.body.idfollower },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idfollower,
      {
        $addToSet: { followed: req.params.id },
      },
      { new: true }
    )
      .then((post) => res.send(post))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unfollow = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { followers: req.body.idfollower },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await User.findByIdAndUpdate(
      req.body.idfollower,
      {
        $pull: { followed: req.params.id },
      },
      { new: true }
    )
      .then((post) => res.send(post))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};
