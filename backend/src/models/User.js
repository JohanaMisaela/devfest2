const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    firstname: {
      type: String,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    age: {
      type: Number,
      minLength: 1,
      maxLength: 2,
      default: 00,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    pwd: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    picture: {
      type: String,
      default: "../../../frontend/public/images/profiles/noImage.png",
    },
    bio: {
      type: String,
    },
    quartier: {
      type: String,
    },
    sexe: {
      type: Boolean, //0=F, 1=M
    },
    idBadge: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 0,
    },
    fb: {
      type: String,
    },
    votes: {
      type: [String],
    },
    likes: {
      type: [String],
      // les postes liker par user
    },
    followed: {
      type: [String],
      // les events suivi par user
    },
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
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (this.isModified("pwd")) this.pwd = await bcrypt.hash(this.pwd, 8);
});

UserSchema.statics.findUser = async function (email, pwd) {
  console.log("ok");
  const user = await this.findOne({ email });
  if (!user) throw new Error("Erreur Pas possible de se connecter!");
  const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
  if (!isPasswordValid) throw new Error("Erreur Pas possible de se connecter!");
  return user;
};

module.exports = mongoose.model("User", UserSchema);
