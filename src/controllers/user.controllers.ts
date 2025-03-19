import { Request, Response } from "express";
import userServices from "../services/user.services";
import { UserReturnSchema } from "../schemas_zod";

const create = async (req: Request, res: Response): Promise<void> => {
  const user = await userServices.create(req.body);
  res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<void> => {
  const users = await userServices.read();
  res.status(200).json(users);
};

const readOne = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id;
  const user = await userServices.readOne(userId);
  res.status(200).json(user);
};
const update = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  const user = await userServices.update(req.body, id);

  const response = UserReturnSchema.parse(user);
  res.status(200).json(response);
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  await userServices.destroy(res.locals.foundEntity.id);
  res.status(204).send();
};
const searchByName = async (req: Request, res: Response): Promise<void> => {
  const name: string = req.body.name;
  const users = await userServices.searchByName(name);
  res.status(200).json(users);
};

export default { create, read, destroy, update, readOne, searchByName };
