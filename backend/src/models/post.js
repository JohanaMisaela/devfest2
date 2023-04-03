const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    isEvent: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      maxlength: 500,
    },
    quartier: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      // si POST
      type: [String],
    },
    followers: {
      // si event
      type: [String],
    },
    isPlainte: {
      // si event
      type: Boolean,
      default: false,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
