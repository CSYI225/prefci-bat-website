import { Controller, Post, Body } from '@nestjs/common';
import { DevisService } from './devis.service';

@Controller('devis')
export class DevisPublicController {
  constructor(private readonly devisService: DevisService) {}

  @Post()
  create(@Body() data: any) {
    return this.devisService.create(data);
  }
}
