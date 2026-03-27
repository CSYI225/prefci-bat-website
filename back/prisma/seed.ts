import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Reset complet de la base (repartir de zéro)
  // (Supprime toutes les données existantes pour éviter les doublons lors du seed)
  await prisma.adminPageContent.deleteMany();
  await prisma.devisRequest.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.realisation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@prefci.com' },
    update: {},
    create: {
      email: 'admin@prefci.com',
      password: hashedPassword,
      name: 'Admin PREFCI',
      role: 'ADMIN',
    },
  });

  // 2. Create Pages
  const pages = [
    { name: 'Accueil', slug: '/' },
    { name: 'Présentation', slug: '/Presentation' },
    { name: 'Services', slug: '/Services' },
    { name: 'Réalisations', slug: '/Realisations' },
    { name: 'Contact', slug: '/Contact' },
  ];

  for (const pageData of pages) {
    const page = await prisma.page.upsert({
      where: { name: pageData.name },
      update: {},
      create: pageData,
    });

    // 3. Create Sections for Accueil
    if (page.name === 'Accueil') {
      // --- Sections pour l'admin (1 section = 1 payload complet pour la page) ---
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: 'admin_accueil',
          order: 1,
          content: {
            banniere: {
              titreNoir: 'FUITE OU ETANCHEITE ?',
              titreBleu: 'ON PROPOSE DES SOLUTIONS RAPIDES ET DURABLES',
              image:
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
            },
            quiSommesNous: {
              image:
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
              titreNoir: 'DES PROFESSIONNELS ENGAGES A',
              titreBleu: 'RESOUDRE VOS PROBLEMES',
              description:
                "PREFCI-BAT SARL est une entreprise experte en plomberie et climatisation.",
            },
            nosServices: {
              titreNoir: 'DES SOLUTIONS ADAPTEES',
              titreBleu: 'A CHAQUE SITUATION',
              description:
                "Nous proposons une large gamme de services pour répondre à tous vos besoins d'installation, d'entretien et de dépannage.",
              services: [
                {
                  id: 1,
                  nom: 'Plomberie',
                  description: 'Installation, réparation et dépannages.',
                  image:
                    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
                },
                {
                  id: 2,
                  nom: 'Sanitaire',
                  description: 'Mise en place et rénovation des équipements.',
                  image:
                    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
                },
              ],
            },
            nosRealisations: {
              titreNoir: 'DES RESULTATS QUI PARLENT',
              titreBleu: 'POUR NOUS',
              description: 'Introduction de la section réalisations.',
              realisations: [
                {
                  id: 3,
                  nom: 'Realisation 1',
                  description: 'Description de la realisation 1.',
                  image:
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
                },
              ],
            },
            nosPartenaires: {
              titreNoir: 'ILS NOUS ONT FAIT',
              titreBleu: 'CONFIANCE',
              description: 'Texte de présentation des partenaires.',
              partenaires: [
                {
                  id: 4,
                  nom: 'Partenaire 1',
                  description: 'Description du partenaire 1.',
                  image:
                    'https://images.unsplash.com/photo-1521790797524-b2497295b8a0',
                },
              ],
            },
            avisClients: {
              titreNoir: 'CE QUE PENSENT',
              titreBleu: 'NOS CLIENTS',
              description: 'Texte de la section avis clients.',
              avis: [
                {
                  id: 11,
                  nom: 'Amonles William',
                  role: 'Client satisfait',
                  texte:
                    'Intervention rapide et équipe professionnelle.',
                  avatar: 'AW',
                },
              ],
            },
            devisGratuit: {
              titreNoir: 'REPONSE RAPIDE SOUS 24H',
              titreBleu: 'SANS ENGAGEMENT',
              description:
                'Texte de la section devis gratuit.',
            },
          },
        },
      });

      const sections = [
        {
          type: 'hero',
          order: 1,
          content: {
            title: 'FUITE OU ÉTANCHÉITÉ ?',
            subtitle: 'ON PROPOSE DES SOLUTIONS',
            highlight: 'RAPIDES ET DURABLES',
          },
        },
        {
          type: 'about',
          order: 2,
          content: {
            subtitle: 'QUI SOMMES-NOUS',
            title: 'DES PROFESSIONNELS ENGAGÉS À RÉSOUDRE VOS PROBLÈMES',
            description1: 'PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation. Nous mettons notre savoir-faire au service de particuliers et de professionnels pour des interventions rapides, des installations fiables et un suivi rigoureux.',
            description2: "De l'étude à l'exécution de vos projets, nous vous accompagnons grâce à une expertise technique éprouvée et un matériel de pointe. Notre priorité est de vous garantir des résultats irréprochables et de vous assurer confort et tranquillité d'esprit, quelles que soient les exigences de votre bâtiment.",
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
          },
        },
        {
          type: 'services_intro',
          order: 3,
          content: {
            subtitle: 'NOS EXPERTISES',
            title: 'DES SOLUTIONS ADAPTÉES À CHAQUE SITUATION',
            description: 'Nous proposons une large gamme de services pour répondre à tous vos besoins d\'installation, de réparation et d\'entretien.',
          },
        },
        {
          type: 'realisations_intro',
          order: 4,
          content: {
            subtitle: 'NOS RÉALISATIONS',
            title: 'DES RÉSULTATS QUI PARLENT POUR NOUS',
            description: 'Découvrez en images quelques-uns de nos projets récents. Une série de réalisations et d\'interventions réussies qui témoignent de notre savoir-faire.',
          },
        },
        {
          type: 'cta',
          order: 5,
          content: {
            title: "BESOIN D'UNE INTERVENTION RAPIDE ?",
            description: "Contactez-nous aujourd'hui pour être mis en relation avec nos experts.",
            buttonText: "CONTACTEZ-NOUS"
          }
        }
      ];

      for (const section of sections) {
        await prisma.section.create({
          data: { ...section, pageId: page.id },
        });
      }
    }

    // Sections for Presentation
    if (page.name === 'Présentation') {
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: 'admin_presentation',
          order: 1,
          content: {
            banniere: {
              titreNoir: 'NOS EQUIPES AUX SERVICES',
              titreBleu: 'DE VOS INSTALLATIONS',
              image:
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
            },
            expertise: {
              titreNoir: 'UNE EXPERTISE TECHNIQUE AU SERVICE',
              titreBleu: 'DE VOS PROJETS',
              description:
                'PREFCI-BAT SARL est une entreprise leader dans la plomberie et la climatisation.',
            },
            quiSommesNous: {
              titreNoir: 'QUI SOMMES-NOUS',
              titreBleu: 'UNE EXPERTISE TECHNIQUE AU SERVICE DE VOS PROJETS',
              description:
                'PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation.',
              image1:
                'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
              image2:
                'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
              image3:
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
            },
            stats: [
              { id: 12, label: "Annees d'experience", value: '10+' },
              { id: 13, label: "Delais d'intervention", value: '24H' },
            ],
            mission: {
              titreNoir: 'NOTRE MISSION',
              titreBleu: 'APPORTER DES SOLUTIONS DURABLES A CHAQUE PROJET',
              description:
                'La mission de PREFCI-BAT SARL est de proposer des solutions techniques optimales.',
              image:
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
            },
            valeurs: [
              {
                id: 14,
                titre: "L'Excellence",
                texte: 'La recherche constante de la perfection dans nos réalisations.',
              },
            ],
            pourquoiTravailler: {
              titreNoir: 'VOTRE SATISFACTION, NOTRE PRIORITE',
              titreBleu: 'POURQUOI TRAVAILLER AVEC NOUS ?',
              description:
                'Nous mettons à votre service une équipe expérimentée et des équipements modernes.',
              raisons: [
                {
                  id: 16,
                  titre: 'RAISON 01',
                  texte:
                    'Une expertise reconnue pour une intervention efficace et rapide.',
                },
              ],
            },
            motDirecteur: {
              nom: 'WILLIAMS KOFFI',
              titre: 'MOT DU DIRECTEUR',
              message1:
                'Chez PREFCI-BAT SARL, nous plaçons l’humain et la qualité au cœur de notre métier.',
              message2:
                'Chaque projet réalisé est le reflet de notre engagement et de notre expertise.',
              message3:
                'Merci pour votre confiance, notre équipe reste disponible pour vos exigences.',
              image:
                'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
            },
            equipe: [
              {
                id: 15,
                nom: 'Sophia Bennett',
                role: 'Ingenieur plombier',
                image:
                  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
              },
            ],
          },
        },
      });

      const sections = [
        {
          type: 'hero',
          order: 1,
          content: {
            title: 'NOS EQUIPES AUX SERVICES',
            subtitle: 'DE VOS INSTALLATIONS',
          }
        },
        {
          type: 'expertise',
          order: 2,
          content: {
            subtitle: 'QUI SOMMES-NOUS',
            title: 'UNE EXPERTISE TECHNIQUE AU SERVICE DE VOS PROJETS',
            description1: 'PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation...',
            description2: "De l'étude à l'exécution de vos projets, nous vous accompagnons..."
          }
        },
        {
          type: 'mission',
          order: 3,
          content: {
            subtitle: 'NOTRE MISSION',
            title: 'APPORTER DES SOLUTIONS DURABLES À CHAQUE PROJET',
            description: 'La mission de PREFCI-BAT SARL est de proposer des solutions techniques optimales...',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
          }
        },
        {
          type: 'values',
          order: 4,
          content: {
            subtitle: 'NOS VALEURS',
            title: 'DES ENGAGEMENTS QUI GUIDENT CHACUNE DE NOS INTERVENTIONS',
            description: 'Chez PREFCI-BAT SARL, nous nous engageons sur différents piliers fondamentaux :',
            valuesList: [
              { title: 'L\'Excellence', text: 'la recherche constante de la perfection...' },
              { title: 'La Réactivité', text: 'une équipe prête à intervenir rapidement...' },
              { title: 'La Sécurité', text: 'le respect strict des normes...' },
              { title: 'L\'Écoute', text: 'un accompagnement sur mesure...' }
            ]
          }
        },
        {
          type: 'director_word',
          order: 5,
          content: {
            subtitle: 'MOT DU DIRECTEUR',
            name: 'WILLIAMS KOFFI',
            paragraphs: [
              "Chez PREFCI-BAT SARL, nous avons fait le choix de placer l'humain...",
              "Chaque projet que nous réalisons est le reflet de notre engagement...",
              "Nous vous remercions pour travailler avec nous..."
            ]
          }
        }
      ];
      for (const section of sections) {
        await prisma.section.create({
          data: { ...section, pageId: page.id },
        });
      }
    }

    // Admin payload for Services / Realisations / Contact (1 section par page)
    if (page.name === 'Services') {
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: 'admin_services',
          order: 1,
          content: {
            banniere: {
              titreNoir: 'NOS SERVICES',
              titreBleu: 'NOS RESULTATS VISIBLES',
              image:
                'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
            },
            details: [
              {
                id: 5,
                nom: 'Plomberie',
                description: "Installation, réparation, fuite",
                image:
                  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
              },
            ],
            cta: {
              titreNoir: 'BESOIN D\'UNE INTERVENTION',
              titreBleu: 'RAPIDE ?',
              description:
                'Contactez-nous pour être mis en relation avec nos experts.',
            },
          },
        },
      });
    }

    if (page.name === 'Réalisations') {
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: 'admin_realisations',
          order: 1,
          content: {
            banniere: {
              titreNoir: 'DES INTERVENTIONS CONCRETES',
              titreBleu: 'DES RESULTATS VISIBLES',
              image:
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
            },
            intro: {
              titreNoir: 'DES RESULTATS QUI PARLENT',
              titreBleu: 'POUR NOUS',
              description:
                "Texte d'introduction des réalisations.",
            },
            realisations: [
              {
                id: 6,
                client: 'Client 1',
                projet: 'Projet 1',
                category: 'PLOMBERIE',
                imgBefore:
                  'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
                imgAfter:
                  'https://images.unsplash.com/photo-1497366216548-37526070297c',
              },
            ],
          },
        },
      });
    }

    if (page.name === 'Contact') {
      await prisma.section.create({
        data: {
          pageId: page.id,
          type: 'admin_contact',
          order: 1,
          content: {
            banniere: {
              titreNoir: 'BESOIN D\'UNE INTERVENTION ?',
              titreBleu: 'CONTACTEZ-NOUS DES MAINTENANT',
              image:
                'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
            },
            infos: [
              { id: 7, titre: 'Adresse', contenu: '10 BP 2486 Abidjan 10, Koumassi' },
              { id: 8, titre: 'Contact', contenu: 'prefcibat@gmail.com / +225 07 58 31 40 19' },
              { id: 17, titre: 'Email', contenu: 'prefcibat@gmail.com' },
              { id: 18, titre: 'Whatsapp', contenu: '+225 07 58 31 40 19' },
            ],
            mapCoordinates: '5.318854,-3.957688',
          },
        },
      });
    }
  }

  // Contenu admin (source de verite = formulaires admin)
  await prisma.adminPageContent.createMany({
    data: [
      {
        pageKey: 'accueil',
        content: {
          banniere: {
            titreNoir: 'FUITE OU ETANCHEITE ?',
            titreBleu: 'ON PROPOSE DES SOLUTIONS RAPIDES ET DURABLES',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
          },
          quiSommesNous: {
            image:
              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
            titreNoir: 'DES PROFESSIONNELS ENGAGES A',
            titreBleu: 'RESOUDRE VOS PROBLEMES',
            description:
              'PREFCI-BAT SARL est une entreprise experte en plomberie et climatisation.',
          },
          nosServices: {
            titreNoir: 'DES SOLUTIONS ADAPTEES',
            titreBleu: 'A CHAQUE SITUATION',
            description: 'Nous proposons une large gamme de services.',
            services: [],
          },
          nosRealisations: {
            titreNoir: 'DES RESULTATS QUI PARLENT',
            titreBleu: 'POUR NOUS',
            description: 'Introduction de la section realisations.',
            realisations: [],
          },
          nosPartenaires: {
            titreNoir: 'ILS NOUS ONT FAIT',
            titreBleu: 'CONFIANCE',
            description: 'Introduction de la section partenaires.',
            partenaires: [],
          },
          avisClients: {
            titreNoir: 'CE QUE PENSENT',
            titreBleu: 'NOS CLIENTS',
            description: 'Texte de la section avis clients.',
            avis: [],
          },
          devisGratuit: {
            titreNoir: 'REPONSE RAPIDE SOUS 24H',
            titreBleu: 'SANS ENGAGEMENT',
            description: 'Texte de la section devis gratuit.',
          },
        },
      },
      {
        pageKey: 'presentation',
        content: {
          banniere: {
            titreNoir: 'NOS EQUIPES AUX SERVICES',
            titreBleu: 'DE VOS INSTALLATIONS',
            image:
              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
          },
        },
      },
      {
        pageKey: 'services',
        content: {
          banniere: {
            titreNoir: 'NOS SERVICES',
            titreBleu: 'NOS RESULTATS VISIBLES',
            image:
              'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
          },
        },
      },
      {
        pageKey: 'realisations',
        content: {
          banniere: {
            titreNoir: 'DES INTERVENTIONS CONCRETES',
            titreBleu: 'DES RESULTATS VISIBLES',
            image:
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
          },
        },
      },
      {
        pageKey: 'contact',
        content: {
          banniere: {
            titreNoir: "BESOIN D'UNE INTERVENTION ?",
            titreBleu: 'CONTACTEZ-NOUS DES MAINTENANT',
            image:
              'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
          },
          mapCoordinates: '5.318854,-3.957688',
          infos: [],
        },
      },
    ],
  });

  // 4. Create Services
  const services = [
    { title: 'Plomberie', description: 'Installation, réparation, fuite', order: 1 },
    { title: 'Sanitaire', description: 'Installation, réparation, fuite', order: 2 },
    { title: 'Froid & Climatisation', description: 'Installation, réparation, fuite', order: 3 },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // 5. Create Realisations
  const realisations = [
    {
      title: 'Plomberie',
      description: 'Réparation rapide',
      category: 'PLOMBERIE',
      client: 'Résidence A',
      project: 'Rénovation complète plomberie',
      imgBefore: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      imgAfter: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      order: 1
    },
    {
      title: 'Étanchéité',
      description: 'Correction de fuite toiture',
      category: 'ÉTANCHÉITÉ',
      client: 'Immeuble B',
      project: 'Étanchéité toiture terrasse',
      imgBefore: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      imgAfter: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      order: 2
    },
  ];

  for (const realisation of realisations) {
    await prisma.realisation.create({ data: realisation });
  }

  // 6. Create Testimonials
  const testimonials = [
    { name: 'Amonles William', role: 'Client satisfait', content: "Intervention très rapide et efficace pour mon problème de plomberie. Le technicien a été très professionnel.", rating: 5 },
    { name: 'Jean Dupont', role: 'Professionnel', content: "J'ai fait appel à PREFCI pour une installation de climatisation et tout a été fait avec soin.", rating: 5 },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  // 7. Create Stats
  const stats = [
    { label: "Années d'expérience", value: "10+" },
    { label: "Délais d'intervention", value: "24H" },
    { label: "Projets réalisés", value: "100+" },
    { label: "Garantie de satisfaction", value: "100%" },
  ];

  for (const stat of stats) {
    await prisma.stat.create({ data: stat });
  }

  // 8. Create Partners
  const partners = [
    { name: 'Aduti', logo: 'aduti.png' },
    { name: 'SantaMaria', logo: 'SantaMaria.png' },
    { name: 'Eleveur', logo: 'eleveur.png' },
    { name: 'Qalilab', logo: 'qalilab.png' },
  ];

  for (const partner of partners) {
    await prisma.partner.create({ data: partner });
  }

  // 9. Create Team Members
  const team = [
    { name: 'Sophia Bennett', role: 'Ingénieur plombier', image: 'services.jpg', socialLinks: { linkedin: '#', instagram: '#' } },
    { name: 'John Doe', role: 'Climatisation Specialist', image: 'services.jpg', socialLinks: { linkedin: '#' } },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
