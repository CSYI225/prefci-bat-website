import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { AdminContentService } from './admin-content.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin-content')
export class AdminContentController {
  constructor(private readonly adminContentService: AdminContentService) {}

  // Lecture (admin)
  @UseGuards(JwtAuthGuard)
  @Get(':pageKey')
  get(@Param('pageKey') pageKey: string) {
    return this.adminContentService.getByPageKey(pageKey);
  }

  // Ecriture (admin)
  @UseGuards(JwtAuthGuard)
  @Patch(':pageKey')
  upsert(@Param('pageKey') pageKey: string, @Body() body: any) {
    return this.adminContentService.upsert(pageKey, body?.content ?? {});
  }
}

