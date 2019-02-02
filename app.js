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

// TEMP
app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Sorry, nothing here yet" });
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost/simple_todo", { useNewUrlParser: true })
  .then(result => {
    app.listen(5000);
  })
  .catch(error => console.log(error));
