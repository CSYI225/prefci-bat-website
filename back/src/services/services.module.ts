import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { ServicesPublicController } from './services-public.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesController, ServicesPublicController],
  providers: [ServicesService],
})
export class ServicesModule {}
