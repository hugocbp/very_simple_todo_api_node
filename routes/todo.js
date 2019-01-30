const express = require("express");

const todoController = require("../controllers/todo");

const router = express.Router();

// GET /todo
router.get("/", todoController.getTodos);

// POST /todo
router.post("/", todoController.createTodo);

module.exports = router;
