import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services";

const create = async (req: Request, res: Response): Promise<void> => {
  const token: SessionReturn = await sessionServices.create(req.body);
  res.status(201).json(token);
};

export default { create };