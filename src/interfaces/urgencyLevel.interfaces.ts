import { z } from "zod";
import { UrgencyLevelSchema } from "../schemas";

type UrgengyLevel = z.infer<typeof UrgencyLevelSchema>;

export { UrgengyLevel };
