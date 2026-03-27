import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sections')
@UseGuards(JwtAuthGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  /**
   * Créer une section (Admin)
   */
  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  /**
   * Liste les sections d'une page (Admin)
   */
  @Get('page/:pageId')
  findByPage(@Param('pageId', ParseIntPipe) pageId: number) {
    return this.sectionsService.findByPage(pageId);
  }

  /**
   * Mettre à jour une section (Admin)
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(id, updateSectionDto);
  }

  /**
   * Supprimer une section (Admin)
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionsService.remove(id);
  }
}
