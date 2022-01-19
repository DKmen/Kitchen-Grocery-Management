const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const categoryModel = mongoose.model('category',categorySchema);
module.exports = categoryModel;