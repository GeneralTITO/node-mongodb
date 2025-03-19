import { z } from "zod";

const AppointmentSchema = z.object({
  id: z.number().int().positive(),
  patientId: z.number().int().positive(),
  employeeId: z.number().int().positive(),
  appointmentDate: z.date().or(z.string()),
  diagnosis: z.string().optional(),
  notes: z.string().optional(),
  prescriptions: z.array(
    z.object({
      id: z.number().int().positive(),
      appointmentId: z.number().int().positive(),
      medicationName: z.string().min(1),
      dosage: z.string().min(1),
      instructions: z.string().optional(),
    })
  ),
});
const AppointmentReturnSchema = AppointmentSchema.nullable();
const AppointmentCreateSchema = AppointmentSchema.omit({
  id: true,
  prescriptions: true,
  patientId:true,
  employeeId: true
});

const AppointmentUpdateSchema = AppointmentCreateSchema.partial();

export {
  AppointmentSchema,
  AppointmentCreateSchema,
  AppointmentUpdateSchema,
  AppointmentReturnSchema,
};
