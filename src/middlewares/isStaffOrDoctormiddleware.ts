import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isStaffOrDoctor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const role: string = res.locals.decoded.role;
  if (role == "Staff" || role == "Doctor") {
    res.locals.role = role;
  }
  if (role == "Patient") {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
