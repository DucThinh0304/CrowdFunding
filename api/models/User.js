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
    isAuthority: {
      type: Boolean,
      default: false,
    },
    name: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    favorite: { type: Array, default: [] },
    phonenumber: { type: String, default: "" },
    gender: { type: String, default: "" },
    birthday: { type: Date, default: "1980-01-01T00:00:00.902+00:00" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
