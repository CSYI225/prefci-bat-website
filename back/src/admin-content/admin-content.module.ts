import { Module } from '@nestjs/common';
import { AdminContentController } from './admin-content.controller';
import { AdminContentService } from './admin-content.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminContentController],
  providers: [AdminContentService],
})
export class AdminContentModule {}

