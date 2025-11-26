import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { startDatabase } from "./src/db.mjs";
startDatabase();
const app = express();
app.use(express.json());
const appPort = Number.parseInt(process.env.APP_PORT);

app.listen(appPort, () => {
  console.log("Application has started on port: " + appPort);
});
