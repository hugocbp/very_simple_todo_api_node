const { validationResult } = require("express-validator/check");

const Todo = require("../models/todo");
const User = require("../models/user");

exports.getTodos = (req, res, next) => {
  Todo.find()
    .where({ creator: req.userId })
    .then(todos => {
      res.status(200).json({
        todos: todos
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data");
    error.statusCode = 422;
    throw error;
  }

  let creator;

  const todo = new Todo({
    title: req.body.title,
    creator: req.userId
  });

  todo
    .save()
    .then(result => User.findById(req.userId))
    .then(user => {
      creator = user;
      user.todos.push(todo);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Todo created successfuly",
        todo: todo,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      if (!todo || todo.creator._id != req.userId) {
        const error = new Error("Could not find todo");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ todo });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data");
    error.statusCode = 422;
    throw error;
  }

  Todo.findById(todoId)
    .then(todo => {
      if (!todo || todo.creator._id != req.userId) {
        const error = new Error("Could not find todo");
        error.statusCode = 404;
        throw error;
      }

      todo.title = req.body.title;
      return todo.save();
    })
    .then(todo => {
      res.status(200).json({ message: "Todo updated", todo: todo });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      if (!todo || todo.creator._id != req.userId) {
        const error = new Error("Could not find todo");
        error.statusCode = 404;
        throw error;
      }

      todo.title = req.body.title;
      return todo.remove();
    })
    .then(todo => {
      res.status(200).json({ message: "Todo deleted", todo: todo });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
