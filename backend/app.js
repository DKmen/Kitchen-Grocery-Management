const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');


const app = express();

app.use(helmet());
app.use(cors());

if (process.env.ENV == "dev") app.use(morgan("dev"));
app.use(express.json());

app.use(express.json());
app.use("/v1/user",userRouter);
app.use("/v1/category",categoryRouter);
app.use("/v1/product",productRouter);



app.all("*", (req, res, next) => {
  const error = new Error(`we can not found ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(404).json({
    message: err.message,
  });
});

module.exports = app;
