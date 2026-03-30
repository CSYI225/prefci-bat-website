import { DevisService } from './devis.service';
export declare class DevisPublicController {
    private readonly devisService;
    constructor(devisService: DevisService);
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
}
