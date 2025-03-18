import "dotenv/config";
import app from "./app";
import { prisma } from "./prismaClient";

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
