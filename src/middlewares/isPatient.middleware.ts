import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { User } from "../schemas_mongoose";
import mongoose from "mongoose";

export const isPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  if (!id) return next();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", 400);
    }



  try {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      throw new AppError("User not found", 404);
    }

    if (foundUser.role !== "Patient") {
      throw new AppError("Staff/Doctor can't be patched in this route", 403);
    }

    return next();
  } catch (error) {
    next(error);
  }
};