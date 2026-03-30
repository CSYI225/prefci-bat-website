import { DevisService } from './devis.service';
export declare class DevisController {
    private readonly devisService;
    constructor(devisService: DevisService);
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
    updateStatut(id: number, statut: string): Promise<{
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
