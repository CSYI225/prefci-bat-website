import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      orderBy: { idService: 'asc' },
    });
  }

  findOne(idService: number) {
    return this.prisma.service.findUnique({
      where: { idService },
    });
  }

  update(idService: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { idService },
      data: updateServiceDto,
    });
  }

  remove(idService: number) {
    return this.prisma.service.delete({
      where: { idService },
    });
  }
}
