import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { validateBody } from "../middlewares/validateBody.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.uniqueEmail,
  userControllers.create
);
userRouter.get("", middlewares.verifyToken, userControllers.read);
userRouter.get(
  "/searchByName",
  middlewares.verifyToken,
  userControllers.searchByName
);
userRouter.get("/:id", middlewares.verifyToken, userControllers.readOne);
userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  middlewares.uniqueEmail,
  middlewares.isOwner,
  userControllers.update
);
userRouter.patch(
  "/updatePatient/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  middlewares.uniqueEmail,
  middlewares.isPatient,
  userControllers.update
);

userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  userControllers.destroy
);
