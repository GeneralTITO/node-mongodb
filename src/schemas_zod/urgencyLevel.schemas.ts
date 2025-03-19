import { z } from "zod";

const UrgencyLevelSchema = z.enum(["Low", "Medium", "High", "Emergency"]);

export { UrgencyLevelSchema };
