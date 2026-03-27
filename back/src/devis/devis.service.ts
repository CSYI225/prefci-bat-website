import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateDevisDto } from './dto/create-devis.dto';

@Injectable()
export class DevisService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  /**
   * Crée une demande de devis et envoie les emails
   */
  async create(createDevisDto: CreateDevisDto) {
    const devis = await this.prisma.devisRequest.create({
      data: createDevisDto,
    });

    // Envoi des notifications (on ne bloque pas la réponse pour l'envoi d'email)
    try {
      await this.mailService.sendAdminNotification(devis);
      await this.mailService.sendClientConfirmation(devis);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails:', error);
    }

    return devis;
  }

  /**
   * Liste toutes les demandes (Admin)
   */
  async findAll() {
    return this.prisma.devisRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Met à jour le statut d'une demande
   */
  async updateStatus(id: number, status: string) {
    return this.prisma.devisRequest.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Supprime une demande
   */
  async remove(id: number) {
    return this.prisma.devisRequest.delete({
      where: { id },
    });
  }
}
