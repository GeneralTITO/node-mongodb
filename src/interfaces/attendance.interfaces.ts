import { z } from "zod";
import { AttendanceSchema } from "../schemas_zod";
import { Prisma } from "@prisma/client";
type Attendance = z.infer<typeof AttendanceSchema>;
type AttendanceCreate = Prisma.AttendancesCreateInput;
type AttendanceUpdate = Prisma.AttendancesUpdateInput;

export { Attendance, AttendanceCreate, AttendanceUpdate };
