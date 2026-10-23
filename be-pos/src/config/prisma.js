import "dotenv/config";
import { PrismaClient } from  "../generated/prisma/client.ts";
import { PrismaMariaDb } from  "@prisma/adapter-mariadb";

// eslint-disable-next-line no-undef
const adapter = new PrismaMariaDb(process.env.DATABASE_URL)
const prisma = new PrismaClient( {adapter} );

export default prisma;