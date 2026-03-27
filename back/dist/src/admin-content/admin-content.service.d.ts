import { PrismaService } from '../prisma/prisma.service';
export declare class AdminContentService {
    private prisma;
    constructor(prisma: PrismaService);
    getByPageKey(pageKey: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        pageKey: string;
    } | null>;
    upsert(pageKey: string, content: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        pageKey: string;
    }>;
}
