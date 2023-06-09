const mongoose = require("mongoose");

const DonateSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    campaign: { type: String, require: true },
    amount: { type: Number, require: true },
    stripe: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stripe", DonateSchema);
