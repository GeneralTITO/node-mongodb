import { z } from "zod";
import {
  AppointmentReturnSchema,
  AppointmentSchema,
} from "../schemas";
import { Prisma } from "@prisma/client";
type Appointment = z.infer<typeof AppointmentSchema>;
type AppointmentCreate = Prisma.AppointmentsCreateInput;
type AppointmentReturn = z.infer<typeof AppointmentReturnSchema>;

type AppointmentUpdate = Prisma.AppointmentsUpdateInput;

export { Appointment, AppointmentCreate, AppointmentUpdate,AppointmentReturn };
