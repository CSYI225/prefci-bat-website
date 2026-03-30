import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesPublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }
}
