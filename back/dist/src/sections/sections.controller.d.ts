import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    create(createSectionDto: CreateSectionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        order: number;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        pageId: number;
    }>;
    findByPage(pageId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        order: number;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        pageId: number;
    }[]>;
    update(id: number, updateSectionDto: UpdateSectionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        order: number;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        pageId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        order: number;
        content: import("@prisma/client/runtime/library").JsonValue | null;
        pageId: number;
    }>;
}
