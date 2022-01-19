const express = require("express");
const userControllers = require("../controllers/userControllers");
const categoryControllers = require("../controllers/categoryControllers");

const categoryRouter = express.Router();

categoryRouter
  .route("/create")
  .post(userControllers.protect, categoryControllers.createCategory);
categoryRouter
  .route("/delete/:id")
  .delete(userControllers.protect, categoryControllers.deleteCategory);
categoryRouter
  .route("/modify/:id")
  .patch(userControllers.protect, categoryControllers.modifyCategoty);
categoryRouter
  .route("/categorys")
  .get(userControllers.protect, categoryControllers.getCategory);

module.exports = categoryRouter;
