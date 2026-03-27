import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  create(createPartnerDto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: createPartnerDto,
    });
  }

  findAll() {
    return this.prisma.partner.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.partner.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return this.prisma.partner.update({
      where: { id },
      data: updatePartnerDto,
    });
  }

  remove(id: number) {
    return this.prisma.partner.delete({
      where: { id },
    });
  }
}
