import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient";
import { AppError } from "../errors";

export const appointmentIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundEntity = await prisma.appointments.findUnique({
    where: { id },
  });

  if (!foundEntity) {
    throw new AppError("Appointment not found", 404);
  }

  res.locals.foundEntity = foundEntity;

  return next();
};