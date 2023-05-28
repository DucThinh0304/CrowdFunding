const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    avt: { type: String, default: "" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: { type: String, default: "" },
    address: { type: Array, default: [] },
    favorite: { type: Array, default: [] },
    support: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
