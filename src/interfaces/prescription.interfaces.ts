import { z } from "zod";
import { PrescriptionSchema } from "../schemas_zod";
import { Prisma } from "@prisma/client";
type Prescription = z.infer<typeof PrescriptionSchema>;
type PrescriptionCreate = Prisma.PrescriptionsCreateInput;
type PrescriptionUpdate = Prisma.PrescriptionsUpdateInput;

export { Prescription, PrescriptionCreate, PrescriptionUpdate };
