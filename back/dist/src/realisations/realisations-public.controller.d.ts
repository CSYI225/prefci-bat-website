import { RealisationsService } from './realisations.service';
export declare class RealisationsPublicController {
    private readonly realisationsService;
    constructor(realisationsService: RealisationsService);
    findAll(): Promise<({
        idRealisation: any;
        titre: any;
        descriptionProjet: any;
        descriptionClient: any;
        imageAvant: any;
        imageApres: any;
        idCategorie: any;
        nomClient: any;
        dateRealisation: any;
        categorie: any;
    } | null)[]>;
    findOne(id: number): Promise<{
        idRealisation: any;
        titre: any;
        descriptionProjet: any;
        descriptionClient: any;
        imageAvant: any;
        imageApres: any;
        idCategorie: any;
        nomClient: any;
        dateRealisation: any;
        categorie: any;
    } | null>;
    findAllCategories(): Promise<{
        idCategorie: number;
        nom: string;
    }[]>;
}
