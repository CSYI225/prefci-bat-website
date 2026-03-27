import { Module } from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { RealisationsController } from './realisations.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RealisationsController],
  providers: [RealisationsService],
})
export class RealisationsModule {}
