const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema(
  {
    reboisement: {
      type: Number,
    },
    recyclage: {
      type: Number,
    },
    trieDechet: {
      type: Number,
    },
    nettoyage: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badge", BadgeSchema);
