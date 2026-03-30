import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';

@Injectable()
export class RealisationsService {
  constructor(private prisma: PrismaService) {}

  private mapToClient(r: any) {
    if(!r) return null;
    return {
      idRealisation: r.idRealisation,
      titre: r.titre,
      descriptionProjet: r.descriptionProjet,
      descriptionClient: r.descriptionClient,
      imageAvant: r.imageAvant,
      imageApres: r.imageApres,
      idCategorie: r.idCategorie,
      nomClient: r.nomClient,
      dateRealisation: r.dateRealisation,
      categorie: r.categorie
    };
  }

  async create(dto: CreateRealisationDto) {
    const r = await this.prisma.realisation.create({
      data: {
        titre: dto.titre,
        descriptionProjet: dto.descriptionProjet,
        descriptionClient: dto.descriptionClient,
        imageAvant: dto.imageAvant,
        imageApres: dto.imageApres,
        idCategorie: dto.idCategorie,
        nomClient: dto.nomClient,
      },
    });
    return this.mapToClient(r);
  }

  async findAll() {
    const reals = await this.prisma.realisation.findMany({
      include: { categorie: true },
      orderBy: { idRealisation: 'desc' },
    });
    return reals.map(r => this.mapToClient(r));
  }

  async findOne(idRealisation: number) {
    const r = await this.prisma.realisation.findUnique({
      where: { idRealisation },
      include: { categorie: true },
    });
    return this.mapToClient(r);
  }

  async update(idRealisation: number, dto: UpdateRealisationDto) {
    try {
      const r = await this.prisma.realisation.update({
        where: { idRealisation },
        data: {
          titre: dto.titre,
          descriptionProjet: dto.descriptionProjet,
          descriptionClient: dto.descriptionClient,
          imageAvant: dto.imageAvant,
          imageApres: dto.imageApres,
          idCategorie: dto.idCategorie,
          nomClient: dto.nomClient,
        },
      });
      return this.mapToClient(r);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Réalisation avec l'ID ${idRealisation} non trouvée.`);
      }
      console.error("Prisma Update Error:", error);
      throw error;
    }
  }

  async remove(idRealisation: number) {
    const r = await this.prisma.realisation.delete({
      where: { idRealisation },
    });
    return this.mapToClient(r);
  }

  // --- CATEGORIES ---
  async findAllCategories() {
    const cats = await this.prisma.category.findMany();
    return cats.map(c => ({
      idCategorie: c.idCategorie,
      nom: c.nom
    }));
  }
}
