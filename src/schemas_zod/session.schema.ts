import { UserSchema } from "./user.schemas";


const sessionSchema = UserSchema.pick({ email: true, password: true });

export { sessionSchema };