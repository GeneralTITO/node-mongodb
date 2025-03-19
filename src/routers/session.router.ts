import { Router } from "express";
import middlewares from "../middlewares";
import { sessionControllers } from "../controllers";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  sessionControllers.create
);
