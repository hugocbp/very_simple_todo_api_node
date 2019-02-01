const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  Todo.find().then(todos => {
    res.status(200).json({
      todos: todos
    });
  });
  // res.status(200).json(Todo.getTodos);
};

exports.createTodo = (req, res, next) => {
  const todo = new Todo({
    title: "First todo on database"
  });

  todo.save();

  res.status(201).json({
    message: "Todo created successfuly",
    todo: todo
  });
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      res.status(200).json({ todo });
    })
    .catch(err => console.log(err));
};

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      todo.title = req.body.title;
      todo.save();
      res.status(200).json({ message: "Todo updated", todo: todo });
    })
    .catch(err => console.log(err));
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then(todo => {
      todo.remove();
      res.status(200).json({ message: "Todo deleted" });
    })
    .catch(err => console.log(err));
};
