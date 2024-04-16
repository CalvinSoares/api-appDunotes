import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;

    const categories = await Category.find({
      user: user,
    });
    return res.send(categories);
  } catch (err) {
    console.log("error in getAllCategories", err);
    throw err;
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { color, icon, isEditable, name }: ICategory = req.body;
    const { user } = req;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    res.send(category);
  } catch (err) {
    console.log("error in createCategory", err);
    res.send({ error: "Something wrong" });
    throw err;
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Category.deleteMany({ _id: id });
    res.send({ msg: "Category deleted successfully" });
  } catch (err) {
    console.log("error in createCategory", err);
    res.send({ error: "Something went wrong" });
    throw err;
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = req.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          color,
          icon,
          isEditable,
          name,
        },
      }
    );
    res.send({ msg: "Category updated successfully" });
  } catch (err) {
    console.log("error in updateCategory", err);
    res.send({ error: "Something went wrong" });
    throw err;
  }
};
