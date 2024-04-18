const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ueb5q99.mongodb.net/`;
const connection = mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

module.exports = connection;
