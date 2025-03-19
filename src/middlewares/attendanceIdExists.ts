import { NextFunction, Request, Response } from "express";
import { Attendance } from "../schemasMongoose";
import { AppError } from "../errors";

export const attendanceIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const foundEntity = await Attendance.findById(id);

  if (!foundEntity) {
    throw new AppError("Attendance not found", 404);
  }

  res.locals.foundEntity = foundEntity;

  return next();
};