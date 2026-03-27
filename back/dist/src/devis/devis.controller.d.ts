import { DevisService } from './devis.service';
import { CreateDevisDto } from './dto/create-devis.dto';
export declare class DevisController {
    private readonly devisService;
    constructor(devisService: DevisService);
    create(createDevisDto: CreateDevisDto): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        phone: string | null;
        serviceType: string | null;
        status: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        phone: string | null;
        serviceType: string | null;
        status: string;
    }[]>;
    updateStatus(id: number, status: string): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        phone: string | null;
        serviceType: string | null;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        phone: string | null;
        serviceType: string | null;
        status: string;
    }>;
}
