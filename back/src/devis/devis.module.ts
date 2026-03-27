import { Module } from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [DevisController],
  providers: [DevisService],
  exports: [DevisService],
})
export class DevisModule {}
