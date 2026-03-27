import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  /**
   * Notification à l'admin lors d'un nouveau devis
   */
  async sendAdminNotification(devis: any) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    await this.transporter.sendMail({
      from: `"Site Web PREFCI-BAT" <${this.configService.get<string>('MAIL_USER')}>`,
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

  /**
   * Confirmation au client
   */
  async sendClientConfirmation(devis: any) {
    await this.transporter.sendMail({
      from: `"PREFCI-BAT SARL" <${this.configService.get<string>('MAIL_USER')}>`,
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
}
