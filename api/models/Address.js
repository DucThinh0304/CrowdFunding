const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    name: { type: String, require: true },
    businessName: { type: String, default: "" },
    province: { type: String, require: true },
    district: { type: String, require: true },
    ward: { type: String, require: true },
    address: { type: String, require: true },
    phonenumber: { type: String, require: true },
    email: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", AddressSchema);
