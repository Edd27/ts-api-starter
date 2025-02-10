import { PrismaClient } from "@prisma/client";
import { ENV } from "../config/env";

declare const global: Global & { prisma?: PrismaClient };

let prisma: PrismaClient;

if (ENV.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
