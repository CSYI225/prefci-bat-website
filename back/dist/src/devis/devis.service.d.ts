import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateDevisDto } from './dto/create-devis.dto';
export declare class DevisService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
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
