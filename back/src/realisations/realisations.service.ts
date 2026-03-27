import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';

@Injectable()
export class RealisationsService {
  constructor(private prisma: PrismaService) {}

  create(createRealisationDto: CreateRealisationDto) {
    return this.prisma.realisation.create({
      data: createRealisationDto,
    });
  }

  findAll() {
    return this.prisma.realisation.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.realisation.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRealisationDto: UpdateRealisationDto) {
    return this.prisma.realisation.update({
      where: { id },
      data: updateRealisationDto,
    });
  }

  remove(id: number) {
    return this.prisma.realisation.delete({
      where: { id },
    });
  }
}
