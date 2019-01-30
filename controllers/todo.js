const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  res.status(200).json(Todo.getTodos);
};

exports.createTodo = (req, res, next) => {
  res.status(201).json({
    message: "I've faked created a Todo!"
  });
};

exports.getTodo = (req, res, next) => {
  res.status(200).json({
    id: 1,
    title: "Mock Todo 1",
    createdAt: Date.now(),
    completed: false,
    description: "Nothing much to add here for now"
  });
};

exports.updateTodo = (req, res, next) => {
  res.status(201).json({
    id: 1,
    title: "Edited Mock Todo 1",
    createdAt: Date.now(),
    completed: false,
    description: "This text is faked changed"
  });
};
