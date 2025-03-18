import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json(error.flatten().fieldErrors);
    return;
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};