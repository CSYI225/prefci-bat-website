import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        image: string | null;
        description: string | null;
        titre: string;
        details: string | null;
        idService: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
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
    update(id: number, updateServiceDto: UpdateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        image: string | null;
        description: string | null;
        titre: string;
        details: string | null;
        idService: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        image: string | null;
        description: string | null;
        titre: string;
        details: string | null;
        idService: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
