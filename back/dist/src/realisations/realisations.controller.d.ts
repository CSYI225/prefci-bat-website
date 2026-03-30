import { RealisationsService } from './realisations.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
export declare class RealisationsController {
    private readonly realisationsService;
    constructor(realisationsService: RealisationsService);
    findAllCategories(): Promise<{
        idCategorie: number;
        nom: string;
    }[]>;
    create(createRealisationDto: CreateRealisationDto): Promise<{
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
    update(id: number, updateRealisationDto: UpdateRealisationDto): Promise<{
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
    remove(id: number): Promise<{
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
}
