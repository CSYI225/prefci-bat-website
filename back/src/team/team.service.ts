import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  create(createTeamMemberDto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: createTeamMemberDto,
    });
  }

  findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.teamMember.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.prisma.teamMember.update({
      where: { id },
      data: updateTeamMemberDto,
    });
  }

  remove(id: number) {
    return this.prisma.teamMember.delete({
      where: { id },
    });
  }
}
