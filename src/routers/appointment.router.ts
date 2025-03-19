import { Router } from "express";
import middlewares from "../middlewares";
import { AppointmentCreateSchema } from "../schemasMongoose";
import { appointmentControllers } from "../controllers";

export const appointmentRouter: Router = Router();

appointmentRouter.get(
  "/",
  middlewares.verifyToken,
  appointmentControllers.read
);
appointmentRouter.get(
  "/getUserAppointments/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  appointmentControllers.getUserAppointments
);
appointmentRouter.get(
  "/:id",
  middlewares.verifyToken,
  middlewares.isStaffOrDoctor,
  middlewares.appointmentIdExists,
  appointmentControllers.readOne
);
appointmentRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.appointmentIdExists,
  appointmentControllers.destroy
);
appointmentRouter.post(
  "/:idStaff/:idUser",
  middlewares.verifyToken,
  middlewares.validateBody(AppointmentCreateSchema),
  appointmentControllers.create
);
