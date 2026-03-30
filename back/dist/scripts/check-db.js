"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const count = await prisma.realisation.count();
    const all = await prisma.realisation.findMany();
    console.log('Realisation count:', count);
    console.log('Sample data:', all.slice(0, 2));
    await prisma.$disconnect();
}
main();
//# sourceMappingURL=check-db.js.map