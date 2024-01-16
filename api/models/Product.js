const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Category: { type: String },
    Chemistry: { type: String },
    Process: { type: String },
    Description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
