const express = require("express");
const userControllers = require("../controllers/userControllers");
const productControllers = require("../controllers/productControllers");

const productRouter = express.Router();

productRouter
  .route("/create")
  .post(userControllers.protect, productControllers.createProduct);
productRouter
  .route("/delete/:id")
  .delete(userControllers.protect, productControllers.deleteProduct);
productRouter
  .route("/modify/:id")
  .patch(userControllers.protect, productControllers.modifyProduct);
productRouter
  .route("/categorys/:id")
  .get(userControllers.protect, productControllers.getProduct);

module.exports = productRouter;
