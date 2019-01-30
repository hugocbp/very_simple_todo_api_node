const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  res.status(200).json(Todo.getTodos);
};

exports.createTodo = (req, res, next) => {
  res.status(201).json({
    message: "I've faked created a Todo!"
  });
};
