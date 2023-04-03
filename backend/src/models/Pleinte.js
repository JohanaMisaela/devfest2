const mongoose = require("mongoose");

const PleinteSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    quartier: {
      type: String,
      maxlength: 500,
    },
    voters: {
      type: [String],
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
    text: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plainte", PleinteSchema);
