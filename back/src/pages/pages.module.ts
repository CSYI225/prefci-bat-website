import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { AdminContentModule } from '../admin-content/admin-content.module';

@Module({
  imports: [AdminContentModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
