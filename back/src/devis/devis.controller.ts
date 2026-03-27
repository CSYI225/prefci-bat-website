import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { DevisService } from './devis.service';
import { CreateDevisDto } from './dto/create-devis.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  /**
   * Soumettre un devis (Public)
   */
  @Post()
  create(@Body() createDevisDto: CreateDevisDto) {
    return this.devisService.create(createDevisDto);
  }

  /**
   * Liste des devis (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.devisService.findAll();
  }

  /**
   * Changer le statut (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.devisService.updateStatus(id, status);
  }

  /**
   * Supprimer un devis (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devisService.remove(id);
  }
}
