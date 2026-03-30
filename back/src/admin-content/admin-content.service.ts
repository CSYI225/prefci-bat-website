import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminContentService {
  constructor(private prisma: PrismaService) {}

  async getPageContent(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          include: {
            champs: {
              include: { valeurs: true }
            },
            blocs: true
          }
        }
      }
    });

    if (!page) throw new NotFoundException('Page non trouvée');

    const result: any = {};

    for (const section of page.sections) {
      const sectionData: any = {};
      const arraysData: any = {};

      // 1. D'abord, organiser les valeurs root et array items
      for (const champ of section.champs) {
        for (const valeur of champ.valeurs) {
          if (valeur.idBloc === null) {
            // Root field
            sectionData[champ.nomChamp] = valeur.contenu;
          } else {
            // Appartient à un bloc
            const bId = valeur.idBloc;
            if (!arraysData[bId]) arraysData[bId] = { id: bId };
            arraysData[bId][champ.nomChamp] = valeur.contenu;
          }
        }
      }

      // 2. Déterminer si la section est purement un tableau ou un objet mixte
      const blocsItems = Object.values(arraysData);
      
      // Si la section n'a qu'un tableau (ex: "equipe"), elle n'aura pas de "root fields" dans le JSON normalement,
      // MAIS dans le DB schema, un nom de clé de tableau ('raisons', 'services') n'est NULLE PART mémorisé, sauf si on devine.
      // Dans notre JSON : 
      // - Si object -> keys: string, arrays
      // Ex: { titreNoir: "...", services: [{...}] }
      // Comment deviner le nom 'services' à la relecture depuis la DB ?
      // On va renvoyer un objet avec une clé générique "items" pour l'array OU utiliser les clés par défaut définies par le slug.
      
      // Pour être 100% robuste par rapport au front-end explicite qu'on a fait, on va "mapper" au retour
      let arrayKeyName = "items";
      if (section.nomSection === 'nosServices') arrayKeyName = 'services';
      if (section.nomSection === 'nosPartenaires') arrayKeyName = 'partenaires';
      if (section.nomSection === 'avisClients') arrayKeyName = 'avis';
      if (section.nomSection === 'pourquoiTravailler') arrayKeyName = 'raisons';
      if (section.nomSection === 'equipe') arrayKeyName = 'membres';

      if (Object.keys(sectionData).length === 0 && blocsItems.length > 0) {
        // C'est potentiellement un pur tableau (ex: equipe, stats, infos)
        result[section.nomSection] = blocsItems;
      } else {
        // C'est un objet (ex: banniere, nosServices)
        result[section.nomSection] = { ...sectionData };
        if (blocsItems.length > 0) {
          result[section.nomSection][arrayKeyName] = blocsItems;
        } else {
          // Même vide, il faut renvoyer le tableau pour éviter `undefined` sur le .map côté front
          if (arrayKeyName !== "items") {
             result[section.nomSection][arrayKeyName] = [];
          }
        }
      }
      
      // Cas specifiques 100% tableaux vides
      if (['stats', 'infos'].includes(section.nomSection) && blocsItems.length === 0) {
         result[section.nomSection] = [];
      }
    }

    return result;
  }

  async patchSection(slug: string, sectionKey: string, data: any) {
    const page = await this.prisma.page.findUnique({ where: { slug } });
    if (!page) throw new NotFoundException('Page introuvable');

    const section = await this.prisma.section.findFirst({
      where: { idPage: page.idPage, nomSection: sectionKey },
      include: { champs: true }
    });
    if (!section) throw new NotFoundException('Section introuvable dans cette page');

    // Mettre à jour avec la donnée
    // data peut être Un APPAREMENT Tableau (Array) ou un Objet
    if (Array.isArray(data)) {
      // 1. Supprimer tous les blocs de cette section pour les recréer proprement
      await this.prisma.bloc.deleteMany({ where: { idSection: section.idSection } });

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const bloc = await this.prisma.bloc.create({ data: { idSection: section.idSection, ordre: i } });
        
        for (const [key, value] of Object.entries(item)) {
          if (key === 'id') continue;
          const champ = section.champs.find(c => c.nomChamp === key);
          if (champ) {
            await this.prisma.valeur.create({
              data: {
                idChamp: champ.idChamp,
                idBloc: bloc.idBloc,
                contenu: value !== null && value !== undefined ? String(value) : ""
              }
            });
          }
        }
      }
    } else if (typeof data === 'object') {
      // Objet : propriétés = root fields, arrays = bloc items
      // Ex: { titreNoir: "...", services: [{...}] }
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          // Delete blocs & recreate
          await this.prisma.bloc.deleteMany({ where: { idSection: section.idSection } });
          for (let i = 0; i < value.length; i++) {
            const item = value[i];
            const bloc = await this.prisma.bloc.create({ data: { idSection: section.idSection, ordre: i } });
            
            for (const [iKey, iValue] of Object.entries(item)) {
              if (iKey === 'id') continue;
              const champ = section.champs.find(c => c.nomChamp === iKey);
              if (champ) {
                await this.prisma.valeur.create({
                  data: { idChamp: champ.idChamp, idBloc: bloc.idBloc, contenu: iValue !== null && iValue !== undefined ? String(iValue) : "" }
                });
              }
            }
          }
        } else {
          // Root field update
          const champ = section.champs.find(c => c.nomChamp === key);
          if (champ) {
            // Trouver valeur existante root
            const existingRootVal = await this.prisma.valeur.findFirst({
              where: { idChamp: champ.idChamp, idBloc: null }
            });
            if (existingRootVal) {
              await this.prisma.valeur.update({
                where: { idValeur: existingRootVal.idValeur },
                data: { contenu: value !== null && value !== undefined ? String(value) : "" }
              });
            } else {
              await this.prisma.valeur.create({
                data: { idChamp: champ.idChamp, idBloc: null, contenu: value !== null && value !== undefined ? String(value) : "" }
              });
            }
          }
        }
      }
    }
    
    return { success: true };
  }
}
