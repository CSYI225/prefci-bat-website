import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  create(createStatDto: CreateStatDto) {
    return this.prisma.stat.create({
      data: createStatDto,
    });
  }

  findAll() {
    return this.prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.stat.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStatDto: UpdateStatDto) {
    return this.prisma.stat.update({
      where: { id },
      data: updateStatDto,
    });
  }

  remove(id: number) {
    return this.prisma.stat.delete({
      where: { id },
    });
  }
}
