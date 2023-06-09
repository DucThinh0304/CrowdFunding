const mongoose = require("mongoose");

const PendingSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    tag: { type: Array },
    donateneed: { type: Number, require: true },
    donatesum: {
      type: Number,
      require: true,
      default: 0,
    },
    img: { type: String, required: true },
    dayfinish: { type: Date, require: true },
    supporters: { type: Number, require: true, default: 0 },
    likes: { type: Number, require: true, default: 0 },
    comments: { type: Number, require: true, default: 0 },
    username: { type: String, require: true },
    description: { type: String, default: "" },
    donateamounts: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pending", PendingSchema);
