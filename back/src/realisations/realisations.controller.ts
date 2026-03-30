import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class RealisationsController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @Get('categories')
  findAllCategories() {
    return this.realisationsService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Post('realisations')
  create(@Body() createRealisationDto: CreateRealisationDto) {
    return this.realisationsService.create(createRealisationDto);
  }

  @Get('realisations')
  findAll() {
    return this.realisationsService.findAll();
  }

  @Get('realisations/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.realisationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('realisations/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRealisationDto: UpdateRealisationDto) {
    try {
      return await this.realisationsService.update(id, updateRealisationDto);
    } catch (error) {
      console.error("Error in RealisationsController.update:", error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('realisations/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.realisationsService.remove(id);
  }
}
