import { PrismaService } from '../prisma/prisma.service';
export declare class DevisService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapToClient;
    findAll(): Promise<({
        id_demande: any;
        nom_client: any;
        email: any;
        telephone: any;
        service_demande: any;
        message: any;
        date_demande: any;
        statut: any;
    } | null)[]>;
    create(data: any): Promise<{
        id_demande: any;
        nom_client: any;
        email: any;
        telephone: any;
        service_demande: any;
        message: any;
        date_demande: any;
        statut: any;
    } | null>;
    updateStatut(idDemande: number, statut: string): Promise<{
        id_demande: any;
        nom_client: any;
        email: any;
        telephone: any;
        service_demande: any;
        message: any;
        date_demande: any;
        statut: any;
    } | null>;
}
