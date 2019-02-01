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
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(err => console.log(err));
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

exports.deleteTodo = (req, res, next) => {
  res.status(200).json({
    message: "R.I.P Mock Todo 1..."
  });
};
