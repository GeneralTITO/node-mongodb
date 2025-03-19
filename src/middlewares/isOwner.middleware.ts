import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isOwner = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { sub } = res.locals.decoded;
  const { id } = req.params;

  if (Number(sub) !== Number(id)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};