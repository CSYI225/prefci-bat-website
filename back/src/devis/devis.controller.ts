import { Controller, Get, Body, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DevisService } from './devis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.devisService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/statut')
  updateStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body('statut') statut: string
  ) {
    return this.devisService.updateStatut(id, statut);
  }
}
