const express = require("express");
const {
  createTask,
  getAllTasks,
  deleteTask,
  getUsersTasks,
  updateTaskState,
} = require("../controllers/tasks");
const tasksRouter = express.Router();

tasksRouter.post("/create", createTask);
tasksRouter.get("/tasks", getAllTasks);
tasksRouter.delete("/:id", deleteTask);
tasksRouter.get("/user-tasks", getUsersTasks);
tasksRouter.put("/:id", updateTaskState);

module.exports = tasksRouter;
