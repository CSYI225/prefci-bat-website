import { Module } from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { RealisationsController } from './realisations.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { RealisationsPublicController } from './realisations-public.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RealisationsController, RealisationsPublicController],
  providers: [RealisationsService],
})
export class RealisationsModule {}
