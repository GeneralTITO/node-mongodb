import { Router } from "express";
import middlewares from "../middlewares";
import {
  SearchByNameSchema,
  UserCreateSchema,
  UserUpdateSchema,
} from "../schemasMongoose";
import { userControllers } from "../controllers";
import { validateBody } from "../middlewares/validateBody.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(UserCreateSchema),
  middlewares.uniqueEmail,
  userControllers.create
);
userRouter.get("", middlewares.verifyToken, userControllers.read);
userRouter.get(
  "/searchByName",
  middlewares.verifyToken,
  middlewares.validateBody(SearchByNameSchema),
  userControllers.searchByName
);
userRouter.get("/:id", middlewares.verifyToken, userControllers.readOne);
userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  middlewares.uniqueEmail,
  middlewares.isOwner,
  validateBody(UserUpdateSchema),
  userControllers.update
);
userRouter.patch(
  "/updatePatient/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  middlewares.uniqueEmail,
  middlewares.isPatient,
  validateBody(UserUpdateSchema),
  userControllers.update
);

userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  userControllers.destroy
);
