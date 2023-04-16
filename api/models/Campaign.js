const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    Id: { type: String, require: true, unique: true },
    title: { type: String, require: true, unique: true },
    tag: { type: Array },
    donateneed: { type: Number, require: true },
    donatesum: {
      type: Number,
      require: true,
    },
    img: { type: String, required: true },
    dayfinish: { type: Date, require: true },
    supporters: { type: Number, require: true },
    likes: { type: Number, require: true },
    comments: { type: Number, require: true },
    username: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
