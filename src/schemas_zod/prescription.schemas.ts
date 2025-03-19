import { z } from "zod";
const objectIdSchema = z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
  message: "Invalid MongoDB ObjectId",
});

const PrescriptionSchema = z.object({
  id: objectIdSchema,
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
