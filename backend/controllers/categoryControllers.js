const userModel = require("../model/userModels");
const productModel = require("../model/productModels");
const categoryModel = require("../model/categoryModels");

exports.createCategory = async (req, res, next) => {
  const category = await categoryModel.create({
    ...req.body,
    userID: req.user._id,
  });

  if (!category) next(new Error("category not create login again"));

  res.status(200).json({
    status: "success",
    data: category,
  });
};

exports.deleteCategory = async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  await productModel.deleteMany({ categoryID: req.params.id });

  res.status(200).json({
    status: "success",
    data: category,
  });
};

exports.modifyCategoty = async (req, res, next) => {
  const modifiedCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body }
  );

  if (!modifiedCategory) next(new Error("category don't find"));

  res.status(200).json({
    status: "success",
    data: modifiedCategory,
  });
};

exports.getCategory = async (req, res, next) => {
  const getCategory = await categoryModel.find({ userID: req.user._id });

  res.status(200).json({
    status: "success",
    data: getCategory,
  });
};
