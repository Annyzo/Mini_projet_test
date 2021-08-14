const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

/**
 * Schema definitions.
 */

let UserSchema = new Schema(
  {
    firstname: {
      trim: true,
      type: String,
      required: true,
    },
    lastname: {
      trim: true,
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      min: 4,
      required: true,
    },
    date_naissance: {
      type: Date,
      required: true,
    },
    sexe: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }

);

// Hash le password avant de l'enregistrer dans le BDD
UserSchema.pre("save", function (next) {
  let user = this;

  // Lance cette methode seulement si le mot de passe subit un changement (ou nouveau)
  if (!user.isModified("password")) return next();

  // genere un salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash le password avec le salt genere
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // reecrit le password avec le password qu'on a hash
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

