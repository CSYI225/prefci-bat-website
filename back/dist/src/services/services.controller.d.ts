import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string | null;
        description: string;
        title: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string | null;
        description: string;
        title: string;
        icon: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string | null;
        description: string;
        title: string;
        icon: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateServiceDto: UpdateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string | null;
        description: string;
        title: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string | null;
        description: string;
        title: string;
        icon: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
