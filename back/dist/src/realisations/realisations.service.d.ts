import { PrismaService } from '../prisma/prisma.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
export declare class RealisationsService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapToClient;
    create(dto: CreateRealisationDto): Promise<{
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
    findOne(idRealisation: number): Promise<{
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
    update(idRealisation: number, dto: UpdateRealisationDto): Promise<{
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
    remove(idRealisation: number): Promise<{
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
