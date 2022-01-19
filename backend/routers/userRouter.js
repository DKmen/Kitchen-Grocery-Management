const express = require("express");
const userControllers = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.route("/create").post(userControllers.addUser);
userRouter
  .route("/delete")
  .delete(userControllers.protect, userControllers.deleteUser);
userRouter.route("/login").post(userControllers.logginUser);
userRouter.route("/forgot").post(userControllers.forgotPassword);
userRouter.route("/reset/:token").post(userControllers.resetPassword);
userRouter.route('/').get(userControllers.getUser);

module.exports = userRouter;
