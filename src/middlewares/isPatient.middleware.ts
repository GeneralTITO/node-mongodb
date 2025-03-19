import { NextFunction, Request, Response } from "express";
import { User } from "../schemasMongoose";
import { AppError } from "../errors";

export const isPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const foundUser = await User.findById(id);
  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  if (foundUser.role !== "Patient") {
    throw new AppError("Only patients can be patched in this route", 409);
  }

  return next();
};