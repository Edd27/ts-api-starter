import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "../routes";
import { errorHandler } from "../utils/error-handler";
import { corsOptions } from "./cors";

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

export default app;
