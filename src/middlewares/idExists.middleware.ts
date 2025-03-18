import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient"; // Certifique-se de importar corretamente o PrismaClient
import { AppError } from "../errors";

export const idExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundEntity = await prisma.user.findUnique({
    where: { id },
  });

  if (!foundEntity) {
    throw new AppError("User not found", 404);
  }

  res.locals.foundEntity = foundEntity;

  return next();
};