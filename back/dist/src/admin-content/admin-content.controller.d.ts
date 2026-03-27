import { AdminContentService } from './admin-content.service';
export declare class AdminContentController {
    private readonly adminContentService;
    constructor(adminContentService: AdminContentService);
    get(pageKey: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        pageKey: string;
    } | null>;
    upsert(pageKey: string, body: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        pageKey: string;
    }>;
}
