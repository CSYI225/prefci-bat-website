"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Début du seeding complet...');
    const adminEmail = 'admin@prefci.com';
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.upsert({
        where: { email: adminEmail },
        update: { motDePasseHash: hashedPassword },
        create: {
            nom: 'Administrateur',
            email: adminEmail,
            motDePasseHash: hashedPassword,
            role: 'superadmin',
        },
    });
    console.log('Utilisateur admin configuré.');
    await prisma.valeur.deleteMany({});
    await prisma.bloc.deleteMany({});
    await prisma.champ.deleteMany({});
    await prisma.section.deleteMany({});
    await prisma.page.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.realisation.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.demandeDevis.deleteMany({});
    console.log('Ancienne structure nettoyée.');
    const createPageStructure = async (slug, nomPage, sectionsData) => {
        const page = await prisma.page.create({ data: { slug, nomPage } });
        console.log(`Page créée : ${nomPage}`);
        for (const sec of sectionsData) {
            const section = await prisma.section.create({
                data: {
                    idPage: page.idPage,
                    nomSection: sec.key,
                },
            });
            for (const ch of sec.champs) {
                const champ = await prisma.champ.create({
                    data: {
                        idSection: section.idSection,
                        nomChamp: ch.nom,
                        typeChamp: ch.type || 'texte',
                    },
                });
                if (ch.valeurDefault !== undefined) {
                    await prisma.valeur.create({
                        data: {
                            idChamp: champ.idChamp,
                            contenu: String(ch.valeurDefault),
                        },
                    });
                }
            }
        }
    };
    await createPageStructure('accueil', 'Accueil', [
        {
            key: 'banniere',
            champs: [
                { nom: 'titreNoir', valeurDefault: "FUITE OU ÉTANCHÉITÉ ?" },
                { nom: 'titreBleu', valeurDefault: "RAPIDES ET DURABLES" },
                { nom: 'image', type: 'image', valeurDefault: "https://images.unsplash.com/photo-1504148455328-497c596d2290?auto=format&fit=crop&w=1600&q=80" }
            ]
        },
        {
            key: 'quiSommesNous',
            champs: [
                { nom: 'titreNoir', valeurDefault: "DES PROFESSIONNELS ENGAGÉS À" },
                { nom: 'titreBleu', valeurDefault: "RÉSOUDRE VOS PROBLÈMES" },
                { nom: 'description', type: 'textarea', valeurDefault: "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation." },
                { nom: 'image', type: 'image', valeurDefault: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" }
            ]
        },
        {
            key: 'nosServices',
            champs: [
                { nom: 'titreNoir', valeurDefault: "DES SOLUTIONS" },
                { nom: 'titreBleu', valeurDefault: "ADAPTÉES À CHAQUE SITUATION" },
                { nom: 'description', type: 'textarea', valeurDefault: "Nous proposons une large gamme de services." },
                { nom: 'nom' }, { nom: 'description', type: 'textarea' }, { nom: 'image', type: 'image' }
            ]
        },
        {
            key: 'nosRealisations',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOS" },
                { nom: 'titreBleu', valeurDefault: "RÉALISATIONS" },
                { nom: 'description', type: 'textarea', valeurDefault: "Découvrez nos projets récents." }
            ]
        },
        {
            key: 'nosPartenaires',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOS" },
                { nom: 'titreBleu', valeurDefault: "PARTENAIRES" },
                { nom: 'description', type: 'textarea', valeurDefault: "Ils nous font confiance." },
                { nom: 'nom' }, { nom: 'image', type: 'image' }
            ]
        },
        {
            key: 'avisClients',
            champs: [
                { nom: 'titreNoir', valeurDefault: "AVIS" },
                { nom: 'titreBleu', valeurDefault: "CLIENTS" },
                { nom: 'description', type: 'textarea', valeurDefault: "Ce que disent nos clients." },
                { nom: 'nom' }, { nom: 'role' }, { nom: 'texte', type: 'textarea' }, { nom: 'avatar' }
            ]
        },
        {
            key: 'devisGratuit',
            champs: [
                { nom: 'titreNoir', valeurDefault: "DEVIS" },
                { nom: 'titreBleu', valeurDefault: "GRATUIT" },
                { nom: 'description', type: 'textarea', valeurDefault: "Contactez-nous pour un devis." }
            ]
        }
    ]);
    await createPageStructure('presentation', 'Présentation', [
        {
            key: 'banniere',
            champs: [
                { nom: 'titreNoir', valeurDefault: "PRÉSENTATION" },
                { nom: 'titreBleu', valeurDefault: "DE L'ENTREPRISE" },
                { nom: 'image', type: 'image', valeurDefault: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80" }
            ]
        },
        {
            key: 'expertise',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOTRE" },
                { nom: 'titreBleu', valeurDefault: "EXPERTISE" },
                { nom: 'description', type: 'textarea', valeurDefault: "Nous maîtrisons les techniques les plus avancées." }
            ]
        },
        {
            key: 'quiSommesNous',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOTRE" },
                { nom: 'titreBleu', valeurDefault: "HISTOIRE" },
                { nom: 'description', type: 'textarea', valeurDefault: "Depuis notre création, nous visons l'excellence." },
                { nom: 'image1', type: 'image', valeurDefault: "" },
                { nom: 'image2', type: 'image', valeurDefault: "" },
                { nom: 'image3', type: 'image', valeurDefault: "" }
            ]
        },
        {
            key: 'stats',
            champs: [
                { nom: 'value' }, { nom: 'label' }
            ]
        },
        {
            key: 'mission',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOTRE" },
                { nom: 'titreBleu', valeurDefault: "MISSION" },
                { nom: 'description', type: 'textarea', valeurDefault: "Répondre à vos besoins avec rigueur." },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        },
        {
            key: 'valeurs',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOS" },
                { nom: 'titreBleu', valeurDefault: "VALEURS" },
                { nom: 'description', type: 'textarea', valeurDefault: "Excellence, Rigueur et Passion guidant chacun de nos projets." },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        },
        {
            key: 'pourquoiTravailler',
            champs: [
                { nom: 'titreNoir', valeurDefault: "POURQUOI" },
                { nom: 'titreBleu', valeurDefault: "NOUS ?" },
                { nom: 'description', type: 'textarea', valeurDefault: "Les avantages de collaborer avec nous." },
                { nom: 'titre' }, { nom: 'texte', type: 'textarea' }, { nom: 'image', type: 'image' }
            ]
        },
        {
            key: 'motDirecteur',
            champs: [
                { nom: 'nom', valeurDefault: "Jean-Baptiste Koffi" },
                { nom: 'message1', type: 'textarea', valeurDefault: "Message 1" },
                { nom: 'message2', type: 'textarea', valeurDefault: "Message 2" },
                { nom: 'message3', type: 'textarea', valeurDefault: "Message 3" },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        },
        {
            key: 'equipe',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOTRE" },
                { nom: 'titreBleu', valeurDefault: "ÉQUIPE" },
                { nom: 'description', type: 'textarea', valeurDefault: "Rencontrez les experts qui font notre force." },
                { nom: 'nom' }, { nom: 'role' }, { nom: 'image', type: 'image' }
            ]
        }
    ]);
    await createPageStructure('services', 'Services', [
        {
            key: 'banniere',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOS" },
                { nom: 'titreBleu', valeurDefault: "SERVICES" },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        }
    ]);
    await createPageStructure('realisations', 'Réalisations', [
        {
            key: 'banniere',
            champs: [
                { nom: 'titreNoir', valeurDefault: "NOS" },
                { nom: 'titreBleu', valeurDefault: "RÉALISATIONS" },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        }
    ]);
    await createPageStructure('contact', 'Contact', [
        {
            key: 'banniere',
            champs: [
                { nom: 'titreNoir', valeurDefault: "CONTACTEZ" },
                { nom: 'titreBleu', valeurDefault: "NOUS" },
                { nom: 'image', type: 'image', valeurDefault: "" }
            ]
        },
        {
            key: 'infos',
            champs: [
                { nom: 'titre' }, { nom: 'contenu' }
            ]
        },
        {
            key: 'mapCoordinates',
            champs: [
                { nom: 'value', valeurDefault: "5.318854,-3.957688" }
            ]
        }
    ]);
    await prisma.service.createMany({
        data: [
            { titre: "Plomberie", description: "", image: "" },
            { titre: "Froid & Climatisation", description: "", image: "" },
            { titre: "Étanchéité", description: "", image: "" }
        ]
    });
    await prisma.category.createMany({
        data: [
            { nom: 'Plomberie' },
            { nom: 'Étanchéité' },
            { nom: 'Froid & Climatisation' }
        ]
    });
    const cat1 = await prisma.category.findFirst({ where: { nom: 'Plomberie' } });
    await prisma.realisation.create({
        data: {
            titre: "Projet Alpha",
            descriptionProjet: "Détails du projet.",
            idCategorie: cat1?.idCategorie
        }
    });
    console.log('Seeding terminé avec succès !');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map