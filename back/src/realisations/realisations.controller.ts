import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('realisations')
export class RealisationsController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRealisationDto: CreateRealisationDto) {
    return this.realisationsService.create(createRealisationDto);
  }

  @Get()
  findAll() {
    return this.realisationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.realisationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRealisationDto: UpdateRealisationDto) {
    return this.realisationsService.update(id, updateRealisationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.realisationsService.remove(id);
  }
}
