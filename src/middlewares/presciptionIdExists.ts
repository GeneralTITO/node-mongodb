import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Prescriptions } from "../schemas_mongoose";
import mongoose from "mongoose";

export const prescriptionIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", 400);
    }

  try {
    const foundEntity = await Prescriptions.findById(id);

    if (!foundEntity) {
      throw new AppError("Prescription not found", 404);
    }

    res.locals.foundEntity = foundEntity;

    return next();
  } catch (error) {
    next(error);
  }
};