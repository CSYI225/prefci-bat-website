import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminContentService } from '../admin-content/admin-content.service';

@Injectable()
export class PagesService {
  constructor(
    private prisma: PrismaService,
    private adminContentService: AdminContentService
  ) {}

  async findAll() {
    return this.prisma.page.findMany({
      orderBy: { nomPage: 'asc' },
    });
  }

  async findOne(slug: string) {
    return this.adminContentService.getPageContent(slug);
  }
}
