import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({
      user: userId,
    });
    res.send(tasks);
  } catch (err) {
    console.log("error in getAllTasks", err);
    res.send({ error: "error while fetching tasks", err });
    throw err;
  }
};

export const getAllTasksByCategory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    res.send(tasks);
  } catch (err) {
    console.log("error in getAllTasksByCategory", err);
    res.send({ error: "error while fetching tasks by category", err });
    throw err;
  }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    res.send(tasks);
  } catch (err) {
    console.log("error in getAllCompletedTasks", err);
    res.send({ error: "error while fetching completed tasks", err });
    throw err;
  }
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const taskToday = new Date();
    taskToday.setHours(0, 0, 0, 0);
    const endOfDay = new Date(taskToday);
    endOfDay.setHours(23, 59, 59, 999);
    const todayISOString = taskToday.toISOString();
    const endOfDayISOString = endOfDay.toISOString();
    const tasks = await Task.find({
      user: userId,
      date: {
        $gte: todayISOString,
        $lte: endOfDayISOString,
      },
    });
    res.send(tasks);
  } catch (err) {
    console.log("error in getTasksForToday", err);
    res.send({ error: "error while fetching tasks from today", err });
    throw err;
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { name, date, categoryId }: ITask = req.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    res.send(task);
  } catch (err) {
    console.log("error in createTask", err);
    res.send({ error: "error while creating tasks", err });
    throw err;
  }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );
    res.send({ mgs: "Task status updated" });
  } catch (err) {
    console.log("error in createTask", err);
    res.send({ error: "error while toggling status tasks", err });
    throw err;
  }
};

export const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = req.body;

    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );
    res.send({ mgs: "Task updated successfully" });
  } catch (err) {
    console.log("error in editTask", err);
    res.send({ error: "error while updating task", err });
    throw err;
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });
    res.send({ msg: "Task deleted successfully" });
  } catch (err) {
    console.log("error in createCategory", err);
    res.send({ error: "Something went wrong" });
    throw err;
  }
};
