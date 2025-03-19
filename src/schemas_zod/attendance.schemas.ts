import { z } from "zod";
import { UrgencyLevelSchema } from "./urgencyLevel.schemas";
const objectIdSchema = z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
  message: "Invalid MongoDB ObjectId",
});

const AttendanceSchema = z.object({
  id: objectIdSchema,
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
