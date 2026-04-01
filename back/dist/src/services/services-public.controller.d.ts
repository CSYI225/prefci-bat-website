import { ServicesService } from './services.service';
export declare class ServicesPublicController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
