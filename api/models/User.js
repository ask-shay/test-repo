const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String },
    location: { type: Object },
    phoneNumber: { type: String, unique: true },
    remarks: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
