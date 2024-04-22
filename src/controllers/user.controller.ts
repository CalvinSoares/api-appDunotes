import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user-model";
import { Types } from "mongoose";
import { IUser } from "../types";

export const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ mgs: "user already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: passwordHash,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("error in createUser", err);
    throw err;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).send({ mgs: "user doens't exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return res.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return res.status(400).send({ msg: "Wrong credentials" });
    }
  } catch (err) {
    console.log("error in loginUser", err);
    throw err;
  }
};
