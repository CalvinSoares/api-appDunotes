import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller";
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.get("/", getAllCategories);
categoryRoutes.post("/create", createCategory);
categoryRoutes.delete("/delete/:id", deleteCategory);
categoryRoutes.put("/update", updateCategory);

export default categoryRoutes;
