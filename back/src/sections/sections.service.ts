import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée une nouvelle section
   */
  async create(createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data: createSectionDto,
    });
  }

  /**
   * Récupère toutes les sections d'une page
   */
  async findByPage(pageId: number) {
    return this.prisma.section.findMany({
      where: { pageId },
      orderBy: { order: 'asc' },
    });
  }

  /**
   * Met à jour une section
   */
  async update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
    });
  }

  /**
   * Supprime une section
   */
  async remove(id: number) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
