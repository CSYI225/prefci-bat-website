import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SectionsModule } from './sections/sections.module';
import { DevisModule } from './devis/devis.module';
import { MailModule } from './mail/mail.module';
import { ServicesModule } from './services/services.module';
import { RealisationsModule } from './realisations/realisations.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { PartnersModule } from './partners/partners.module';
import { TeamModule } from './team/team.module';
import { StatsModule } from './stats/stats.module';
import { AdminContentModule } from './admin-content/admin-content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    PagesModule,
    SectionsModule,
    DevisModule,
    MailModule,
    ServicesModule,
    RealisationsModule,
    TestimonialsModule,
    PartnersModule,
    TeamModule,
    StatsModule,
    AdminContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
