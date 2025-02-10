import { config } from "dotenv";

config();

export const ENV = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_VERSION: process.env.API_VERSION || "1",
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_CONTAINER_NAME: process.env.DATABASE_CONTAINER_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  TZ: process.env.TZ || "America/Mexico_City",
};
