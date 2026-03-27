import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }[]>;
    findOne(slug: string): Promise<{
        sections: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            order: number;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            pageId: number;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    findById(id: number): Promise<{
        sections: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            order: number;
            content: import("@prisma/client/runtime/library").JsonValue | null;
            pageId: number;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    update(id: number, updatePageDto: UpdatePageDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
}
