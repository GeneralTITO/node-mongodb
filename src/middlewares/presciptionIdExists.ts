import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient";
import { AppError } from "../errors";

export const presciptionIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundEntity = await prisma.prescriptions.findUnique({
    where: { id },
  });

  if (!foundEntity) {
    throw new AppError("Prescription not found", 404);
  }

  res.locals.foundEntity = foundEntity;

  return next();
};