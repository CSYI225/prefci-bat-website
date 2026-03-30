import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RealisationsService } from './realisations.service';

@Controller('realisations')
export class RealisationsPublicController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @Get()
  findAll() {
    return this.realisationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.realisationsService.findOne(id);
  }

  @Get('categories')
  findAllCategories() {
    return this.realisationsService.findAllCategories();
  }
}
