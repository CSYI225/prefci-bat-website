"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASS'),
            },
        });
    }
    async sendAdminNotification(devis) {
        const adminEmail = this.configService.get('ADMIN_EMAIL');
        await this.transporter.sendMail({
            from: `"Site Web PREFCI-BAT" <${this.configService.get('MAIL_USER')}>`,
            to: adminEmail,
            subject: 'Nouvelle demande de devis reçue !',
            html: `
        <h3>Nouvelle demande de devis</h3>
        <p><strong>Nom :</strong> ${devis.name}</p>
        <p><strong>Email :</strong> ${devis.email}</p>
        <p><strong>Téléphone :</strong> ${devis.phone || 'Non renseigné'}</p>
        <p><strong>Service demandé :</strong> ${devis.serviceType || 'Général'}</p>
        <p><strong>Message :</strong></p>
        <p>${devis.message}</p>
      `,
        });
    }
    async sendClientConfirmation(devis) {
        await this.transporter.sendMail({
            from: `"PREFCI-BAT SARL" <${this.configService.get('MAIL_USER')}>`,
            to: devis.email,
            subject: 'Confirmation de votre demande de devis',
            html: `
        <h3>Bonjour ${devis.name},</h3>
        <p>Nous avons bien reçu votre demande de devis concernant : <strong>${devis.serviceType || 'nos services'}</strong>.</p>
        <p>Notre équipe l'étudiera dans les plus brefs délais et reviendra vers vous.</p>
        <p>Cordialement,<br>L'équipe PREFCI-BAT SARL</p>
      `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map