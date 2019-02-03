const express = require("express");
const { body } = require("express-validator/check");

const todoController = require("../controllers/todo");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// GET /todo
router.get("/", isAuth, todoController.getTodos);

// POST /todo
router.post(
  "/",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 2 })
  ],
  todoController.createTodo
);

// GET /todo/:id
router.get("/:todoId", isAuth, todoController.getTodo);

// PUT /todo/:id
router.put(
  "/:todoId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 2 })
  ],
  todoController.updateTodo
);

// DELETE /todo/:id
router.delete("/:todoId", isAuth, todoController.deleteTodo);

module.exports = router;
