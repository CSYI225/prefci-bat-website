import { PrismaService } from '../prisma/prisma.service';
import { AdminContentService } from '../admin-content/admin-content.service';
export declare class PagesService {
    private prisma;
    private adminContentService;
    constructor(prisma: PrismaService, adminContentService: AdminContentService);
    findAll(): Promise<{
        idPage: number;
        slug: string;
        nomPage: string;
    }[]>;
    findOne(slug: string): Promise<any>;
}
