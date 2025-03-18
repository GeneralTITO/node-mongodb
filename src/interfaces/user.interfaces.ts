import { z } from "zod";
import { UserReturnSchema, UserSchema, ArrayUserReturnSchema } from "../schemas";
import { Prisma } from "@prisma/client";
type User = z.infer<typeof UserSchema>;
type UserCreate = Prisma.UserCreateInput;
type ArrayUserReturn = z.infer<typeof ArrayUserReturnSchema>;
type UserUpdate = Prisma.UserUpdateInput;
type UserReturn = z.infer<typeof UserReturnSchema>;

export { User, UserCreate, UserUpdate, UserReturn,ArrayUserReturn };
