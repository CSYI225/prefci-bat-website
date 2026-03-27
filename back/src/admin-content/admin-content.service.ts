import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminContentService {
  constructor(private prisma: PrismaService) {}

  async getByPageKey(pageKey: string) {
    return this.prisma.adminPageContent.findUnique({
      where: { pageKey },
    });
  }

  async upsert(pageKey: string, content: any) {
    return this.prisma.adminPageContent.upsert({
      where: { pageKey },
      create: { pageKey, content },
      update: { content },
    });
  }
}

