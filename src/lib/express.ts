import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { openAPIRouter } from "../config/open-api-router";
import errorHandler from "../middlewares/error-handler";
import requestLogger from "../middlewares/request-logger";
import router from "../routes";
import { corsOptions } from "./cors";

const app: Application = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(requestLogger);
app.use(router);
router.use(openAPIRouter);
app.use(errorHandler());

export default app;
