import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}

interface JwtPayload {
  _id: string;
}

export const authenticationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        error: "Authorization is required",
      });
    }
    const token = authorization;
    const { _id } = jwt.verify(token, "express") as JwtPayload;
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      req.user = existingUser.id;
    }
    next();
  } catch (err) {
    console.log("error in authentication middleware", err);
    throw err;
  }
};
