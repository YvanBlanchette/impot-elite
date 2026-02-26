import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://impot_user:TestPass123@127.0.0.1:5432/impot_elite",
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;