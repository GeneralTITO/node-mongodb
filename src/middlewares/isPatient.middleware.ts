import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../prismaClient";

export const isPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const idNumber: number = Number(id);
  if (!id) return next();

  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: idNumber },
    });
    if (!foundUser) {
      throw new AppError("Email already exists", 409);
    }

    if (foundUser.role != "Patient") {
        throw new AppError("Staff/Doctor cant be patched in this route", 409);
    }

    return next();
  } catch (error) {
    next(error);
  }
};
