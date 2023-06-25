const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    comment: { type: String, require: true },
    campaign: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
