import "dotenv/config";
import app from "./app";
import connectToDatabase from "./mongodbClient";

const PORT: number = Number(process.env.PORT) || 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});