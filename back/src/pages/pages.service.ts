import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée une nouvelle page
   */
  async create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({
      data: createPageDto,
    });
  }

  /**
   * Récupère toutes les pages (sans les sections pour la liste simple)
   */
  async findAll() {
    return this.prisma.page.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Récupère une page par son slug avec ses sections
   */
  async findOne(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      throw new NotFoundException(`Page avec le slug "${slug}" introuvable`);
    }

    return page;
  }

  /**
   * Récupère une page par son ID
   */
  async findById(id: number) {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { sections: true },
    });

    if (!page) {
      throw new NotFoundException(`Page avec l'ID #${id} introuvable`);
    }

    return page;
  }

  /**
   * Met à jour une page
   */
  async update(id: number, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
  }

  /**
   * Supprime une page (les sections seront supprimées en cascade via Prisma)
   */
  async remove(id: number) {
    await this.findById(id);
    return this.prisma.page.delete({
      where: { id },
    });
  }
}
