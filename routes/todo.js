const express = require("express");
const { body } = require("express-validator/check");

const todoController = require("../controllers/todo");
const authController = require("../controllers/auth");

const router = express.Router();

// GET /todo
router.get("/", todoController.getTodos);

// POST /todo
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 2 })
  ],
  todoController.createTodo
);

// GET /todo/:id
router.get("/:todoId", todoController.getTodo);

// PUT /todo/:id
router.put(
  "/:todoId",
  [
    body("title")
      .trim()
      .isLength({ min: 2 })
  ],
  todoController.updateTodo
);

// DELETE /todo/:id
router.delete("/:todoId", todoController.deleteTodo);

module.exports = router;
