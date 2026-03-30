import { Module } from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { DevisPublicController } from './devis-public.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [DevisController, DevisPublicController],
  providers: [DevisService],
  exports: [DevisService],
})
export class DevisModule {}
