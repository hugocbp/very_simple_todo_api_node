const express = require("express");

const todoController = require("../controllers/todo");

const router = express.Router();

// GET /todo
router.get("/", todoController.getTodos);

// POST /todo
router.post("/", todoController.createTodo);

// GET /todo/:id
router.get("/:todoId", todoController.getTodo);

// PUT /todo/:id
router.put("/:todoId", todoController.updateTodo);

// DELETE /todo/:id
router.delete("/1", todoController.deleteTodo);

module.exports = router;
