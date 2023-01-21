const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const router = require("./controllers/people");
const middleware = require("./utils/middlware");

const app = express();

// Connecting to database
console.log(config.MONGODB_URI);
console.log("Connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

// Middlewares
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/persons", router);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
