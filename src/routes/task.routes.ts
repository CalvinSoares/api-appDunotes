import express from "express";
import { authenticationMiddleware } from "../middleware";
import {
  createTask,
  deleteTask,
  editTask,
  getAllCompletedTasks,
  getAllTasks,
  getAllTasksByCategory,
  getTasksForToday,
  toggleTaskStatus,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.get("/", getAllTasks);
taskRoutes.get("/tasks-by-categories/:id", getAllTasksByCategory);
taskRoutes.get("/completed", getAllCompletedTasks);
taskRoutes.get("/today", getTasksForToday);
taskRoutes.post("/create", createTask);
taskRoutes.put("/update/:id", toggleTaskStatus);
taskRoutes.put("/edit/:id", editTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
