import prisma from "../src/config/prisma.js";
import { userSeeder } from "./seeder/user.seeder.js";
async function main () {
  await userSeeder();
}
// eslint-disable-next-line no-undef
main().catch((e) => {
  console.error(e)
  // eslint-disable-next-line no-undef
  process.exit(1)
}).finally(async() => {
  await prisma.$disconnect()
})