import { AdminContentService } from './admin-content.service';
export declare class AdminContentController {
    private readonly adminContentService;
    constructor(adminContentService: AdminContentService);
    get(slug: string): Promise<any>;
    upsertSection(slug: string, sectionKey: string, body: any): Promise<{
        success: boolean;
    }>;
}
