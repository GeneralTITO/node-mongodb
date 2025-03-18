import { z } from "zod";

const RoleSchema = z.enum(["Doctor", "Staff", "Patient"]);

const UserSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.date().or(z.string()),
  gender: z.string().min(1),
  role: RoleSchema,
  password: z.string(),
  resetToken: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email(),
  address: z.string().nullable().optional(),
  appointmentsPatient: z
    .array(
      z.object({
        id: z.number().int().positive(),
        patientId: z.number().int().positive(),
        employeeId: z.number().int().positive(),
        appointmentDate: z.date(),
        diagnosis: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  appointmentsEmployee: z
    .array(
      z.object({
        id: z.number().int().positive(),
        patientId: z.number().int().positive(),
        employeeId: z.number().int().positive(),
        appointmentDate: z.date(),
        diagnosis: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  attendancesPatient: z
    .array(
      z.object({
        id: z.number().int().positive(),
        patientId: z.number().int().positive(),
        employeeId: z.number().int().positive(),
        urgencyLevel: z.enum(["Low", "Medium", "High", "Emergency"]),
        observations: z.string().optional(),
      })
    )
    .optional(),
  attendancesEmployee: z
    .array(
      z.object({
        id: z.number().int().positive(),
        patientId: z.number().int().positive(),
        employeeId: z.number().int().positive(),
        urgencyLevel: z.enum(["Low", "Medium", "High", "Emergency"]),
        observations: z.string().optional(),
      })
    )
    .optional(),
});
const UserReturnSchema = UserSchema.omit({
  appointmentsPatient: true,
  appointmentsEmployee: true,
  attendancesPatient: true,
  attendancesEmployee: true,
  resetToken: true,
  password: true,
}).nullable();

const ArrayUserReturnSchema = z.array(UserReturnSchema);
const UserCreateSchema = UserSchema.omit({
  id: true,
  appointmentsPatient: true,
  appointmentsEmployee: true,
  attendancesPatient: true,
  attendancesEmployee: true,
});

const UserUpdateSchema = UserCreateSchema.partial();
const SearchByNameSchema = z.object({ name: z.string().min(1) });

export {
  UserSchema,
  UserCreateSchema,
  UserUpdateSchema,
  UserReturnSchema,
  ArrayUserReturnSchema,
  SearchByNameSchema,
};
