const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todo");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());

app.use("/todo", todoRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Sorry, nothing here yet" });
});

mongoose
  .connect("mongodb://localhost/simple_todo")
  .then(result => {
    app.listen(5000);
  })
  .catch(error => console.log(error));
