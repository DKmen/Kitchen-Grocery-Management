const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    expireDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    productQuentaty: {
      type: Number,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
