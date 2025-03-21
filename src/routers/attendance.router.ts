import { Router } from "express";
import middlewares from "../middlewares";
import { attendanceControllers } from "../controllers";
import { AttendanceCreateSchema } from "../schemas_zod";

export const attendanceRouter: Router = Router();

attendanceRouter.get("", middlewares.verifyToken, attendanceControllers.read);
attendanceRouter.get(
  "/getUserAttendances/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  attendanceControllers.getUserAttendances
);

attendanceRouter.get(
  "/:id",
  middlewares.verifyToken,
  middlewares.attendanceIdExists,
  attendanceControllers.readOne
);
attendanceRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.attendanceIdExists,
  attendanceControllers.destroy
);
attendanceRouter.post(
  "/:idStaff/:idUser",
  middlewares.verifyToken,
  middlewares.validateBody(AttendanceCreateSchema),
  attendanceControllers.create
);
