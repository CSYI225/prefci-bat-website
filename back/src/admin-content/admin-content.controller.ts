import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { AdminContentService } from './admin-content.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/pages')
export class AdminContentController {
  constructor(private readonly adminContentService: AdminContentService) {}

  @Get(':slug/content')
  get(@Param('slug') slug: string) {
    return this.adminContentService.getPageContent(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug/:sectionKey')
  upsertSection(
    @Param('slug') slug: string,
    @Param('sectionKey') sectionKey: string,
    @Body() body: any
  ) {
    return this.adminContentService.patchSection(slug, sectionKey, body);
  }
}
