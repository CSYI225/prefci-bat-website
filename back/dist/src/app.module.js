"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const pages_module_1 = require("./pages/pages.module");
const sections_module_1 = require("./sections/sections.module");
const devis_module_1 = require("./devis/devis.module");
const mail_module_1 = require("./mail/mail.module");
const services_module_1 = require("./services/services.module");
const realisations_module_1 = require("./realisations/realisations.module");
const testimonials_module_1 = require("./testimonials/testimonials.module");
const partners_module_1 = require("./partners/partners.module");
const team_module_1 = require("./team/team.module");
const stats_module_1 = require("./stats/stats.module");
const admin_content_module_1 = require("./admin-content/admin-content.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            pages_module_1.PagesModule,
            sections_module_1.SectionsModule,
            devis_module_1.DevisModule,
            mail_module_1.MailModule,
            services_module_1.ServicesModule,
            realisations_module_1.RealisationsModule,
            testimonials_module_1.TestimonialsModule,
            partners_module_1.PartnersModule,
            team_module_1.TeamModule,
            stats_module_1.StatsModule,
            admin_content_module_1.AdminContentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map