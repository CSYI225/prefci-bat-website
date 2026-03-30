import { ServicesService } from './services.service';
export declare class ServicesPublicController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        image: string | null;
        description: string | null;
        titre: string;
        details: string | null;
        idService: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        image: string | null;
        description: string | null;
        titre: string;
        details: string | null;
        idService: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
