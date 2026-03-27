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
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  /**
   * Créer une page (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  /**
   * Liste toutes les pages (Admin/Public)
   */
  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  /**
   * Détails d'une page par slug (Public)
   */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pagesService.findOne(slug);
  }

  /**
   * Détails d'une page par ID (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.pagesService.findById(id);
  }

  /**
   * Mettre à jour une page (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pagesService.update(id, updatePageDto);
  }

  /**
   * Supprimer une page (Admin)
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagesService.remove(id);
  }
}
