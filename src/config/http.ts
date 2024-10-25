import { createServer } from "http";
import expressApp from "../lib/express";

export const server = createServer(expressApp);
