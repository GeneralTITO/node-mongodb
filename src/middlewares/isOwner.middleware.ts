import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import mongoose from "mongoose";

export const isOwner = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { sub } = res.locals.decoded;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid user ID", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(sub)) {
    throw new AppError("Invalid user ID", 400);
  }
  console.log(sub, id);
  if (sub.toString() !== id.toString()) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
