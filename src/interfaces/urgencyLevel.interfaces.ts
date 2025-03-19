import { z } from "zod";
import { UrgencyLevelSchema } from "../schemas_zod";

type UrgengyLevel = z.infer<typeof UrgencyLevelSchema>;

export { UrgengyLevel };
