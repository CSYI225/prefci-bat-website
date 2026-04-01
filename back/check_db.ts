
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'presentation' },
    include: {
      sections: {
        include: {
          champs: true
        }
      }
    }
  });

  if (!page) {
    console.log("Page 'presentation' not found");
    return;
  }

  console.log(`Page: ${page.nomPage} (${page.slug})`);
  for (const section of page.sections) {
    console.log(`  Section: ${section.nomSection}`);
    for (const champ of section.champs) {
      const valCount = await prisma.valeur.count({ where: { idChamp: champ.idChamp, idBloc: null } });
      const blocValCount = await prisma.valeur.count({ where: { idChamp: champ.idChamp, idBloc: { not: null } } });
      console.log(`    Champ: ${champ.nomChamp} (${champ.typeChamp}) - Vals: ${valCount}, BlocVals: ${blocValCount}`);
    }
  }

  // Also check services images
  const services = await prisma.service.findMany();
  console.log("\nServices:");
  for (const s of services) {
    console.log(`  Service: ${s.titre} - Image: ${s.image ? (s.image.length > 50 ? s.image.substring(0, 50) + "..." : s.image) : "NONE"}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
