import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { prisma } from "../prismaClient";


export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;
  
  if (!email) return next();

  try {
    const foundUser = await prisma.user.findUnique({
      where: { email }
    });

    if (foundUser) {
      throw new AppError("Email already exists", 409);
    }

    return next();
  } catch (error) {
    next(error);
  }
};