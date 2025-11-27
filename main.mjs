import express from "express";
import dotenv from "dotenv";
import endRouts from "./src/endpoints.mjs";
dotenv.config();
import { startDatabase } from "./src/db.mjs";
startDatabase();
const app = express();
app.use(express.json());
const appPort = Number.parseInt(process.env.APP_PORT);

app.use("/api", endRouts);

app.listen(appPort, () => {
  console.log("Application has started on port: " + appPort);
});
