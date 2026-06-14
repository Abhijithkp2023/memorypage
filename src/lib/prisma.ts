import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes("your_password") || connectionString.includes("password@localhost")) {
    // Return a proxy that throws a clear error on any DB call
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error(
          "DATABASE_URL is not configured. Set a real PostgreSQL connection string in .env to use database features."
        );
      },
    });
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter, log: ["error"] });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? (createPrismaClient() as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
