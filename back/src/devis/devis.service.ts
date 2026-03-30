import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevisService {
  constructor(private prisma: PrismaService) {}

  private mapToClient(d: any) {
    if(!d) return null;
    return {
      id_demande: d.idDemande,
      nom_client: d.nomClient,
      email: d.email,
      telephone: d.telephone,
      service_demande: d.serviceDemande,
      message: d.message,
      date_demande: d.dateDemande,
      statut: d.statut
    };
  }

  async findAll() {
    const devisList = await this.prisma.demandeDevis.findMany({
      orderBy: { idDemande: 'desc' },
    });
    return devisList.map(d => this.mapToClient(d));
  }

  async create(data: any) {
    const created = await this.prisma.demandeDevis.create({
      data: {
        nomClient: `${data.nom || ''} ${data.prenom || ''}`.trim(),
        email: data.email,
        telephone: data.telephone,
        serviceDemande: data.service,
        message: data.message,
        statut: 'en_attente'
      }
    });
    return this.mapToClient(created);
  }

  async updateStatut(idDemande: number, statut: string) {
    const updated = await this.prisma.demandeDevis.update({
      where: { idDemande },
      data: { statut },
    });
    return this.mapToClient(updated);
  }
}
