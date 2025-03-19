import { z } from "zod";
import { UrgencyLevelSchema } from "./urgencyLevel.schemas";

const AttendanceSchema = z.object({
  id: z.number().int().positive(),
  patientId: z.number().int().positive(),
  employeeId: z.number().int().positive(),
  urgencyLevel: UrgencyLevelSchema,
  observations: z.string().optional(),
});

const AttendanceCreateSchema = AttendanceSchema.omit({
  id: true,
  patientId:true,
  employeeId: true
});

const AttendanceUpdateSchema = AttendanceCreateSchema.partial();

export { AttendanceSchema, AttendanceCreateSchema, AttendanceUpdateSchema };
