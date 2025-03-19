import { z } from "zod";
import { sessionSchema } from "../schemas_zod/session.schema";

type SessionCreate = z.infer<typeof sessionSchema>;
type SessionReturn = { token: string; role: string; idUser: string };

export { SessionCreate, SessionReturn };
