import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { User } from "../schemas_mongoose";

export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;

  if (!email) return next();

  try {
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      throw new AppError("Email já existe", 409);
    }

    return next();
  } catch (error) {
    next(error);
  }
};