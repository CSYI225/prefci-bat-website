import { RealisationsService } from './realisations.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
export declare class RealisationsController {
    private readonly realisationsService;
    constructor(realisationsService: RealisationsService);
    create(createRealisationDto: CreateRealisationDto): import(".prisma/client").Prisma.Prisma__RealisationClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string;
        title: string;
        client: string | null;
        category: string;
        imgBefore: string;
        imgAfter: string | null;
        project: string | null;
        featured: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string;
        title: string;
        client: string | null;
        category: string;
        imgBefore: string;
        imgAfter: string | null;
        project: string | null;
        featured: boolean;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__RealisationClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string;
        title: string;
        client: string | null;
        category: string;
        imgBefore: string;
        imgAfter: string | null;
        project: string | null;
        featured: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateRealisationDto: UpdateRealisationDto): import(".prisma/client").Prisma.Prisma__RealisationClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string;
        title: string;
        client: string | null;
        category: string;
        imgBefore: string;
        imgAfter: string | null;
        project: string | null;
        featured: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__RealisationClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string;
        title: string;
        client: string | null;
        category: string;
        imgBefore: string;
        imgAfter: string | null;
        project: string | null;
        featured: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
