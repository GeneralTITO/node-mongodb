import { Router } from "express";
import middlewares from "../middlewares";
import { sessionControllers } from "../controllers";
import { sessionSchema } from "../schemas_zod";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  middlewares.validateBody(sessionSchema),
  sessionControllers.create
);
