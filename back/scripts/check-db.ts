import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.realisation.count();
  const all = await prisma.realisation.findMany();
  console.log('Realisation count:', count);
  console.log('Sample data:', all.slice(0, 2));
  await prisma.$disconnect();
}

main();
