import { z } from "zod";

const PrescriptionSchema = z.object({
  id: z.number().int().positive(),
  appointmentId: z.number().int().positive(),
  medicationName: z.string().min(1),
  dosage: z.string().min(1),
  instructions: z.string().optional(),
});

const PrescriptionCreateSchema = PrescriptionSchema.omit({
  id: true,
  appointmentId: true,
});

const PrescriptionUpdateSchema = PrescriptionCreateSchema.partial();

export {
  PrescriptionSchema,
  PrescriptionCreateSchema,
  PrescriptionUpdateSchema,
};
