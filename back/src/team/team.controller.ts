import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamService.create(createTeamMemberDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamService.update(id, updateTeamMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.remove(id);
  }
}
