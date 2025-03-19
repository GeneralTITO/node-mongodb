import { NextFunction, Request, Response } from "express";
import { Appointment } from "../schemasMongoose";
import { AppError } from "../errors";

export const appointmentIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const foundEntity = await Appointment.findById(id);

  if (!foundEntity) {
    throw new AppError("Appointment not found", 404);
  }

  res.locals.foundEntity = foundEntity;

  return next();
};