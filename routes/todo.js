const express = require("express");

const todoController = require("../controllers/todo");

const router = express.Router();

// GET /todo
router.get("/", todoController.getTodos);

// POST /todo
router.post("/", todoController.createTodo);

// GET /todo/:id
router.get("/1", todoController.getTodo);

module.exports = router;
