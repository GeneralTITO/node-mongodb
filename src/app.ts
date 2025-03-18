import "express-async-errors";
import express, { Application, json } from "express";
import middlewares from "./middlewares";
import router from "./routers";

const app: Application = express();

app.use(json());
app.use("/api", router)

app.use(middlewares.handleError);

export default app;