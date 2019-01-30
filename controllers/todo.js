const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  res.status(200).json(Todo.getTodos);
};
