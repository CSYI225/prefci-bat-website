import { PrismaService } from '../prisma/prisma.service';
export declare class AdminContentService {
    private prisma;
    constructor(prisma: PrismaService);
    getPageContent(slug: string): Promise<any>;
    patchSection(slug: string, sectionKey: string, data: any): Promise<{
        success: boolean;
    }>;
}
