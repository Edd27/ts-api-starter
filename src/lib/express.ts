import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import errorHandler from "../middlewares/error-handler";
import router from "../routes";
import { corsOptions } from "./cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(router);
app.use(errorHandler());

export default app;
