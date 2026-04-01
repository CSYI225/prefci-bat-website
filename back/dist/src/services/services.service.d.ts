import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    }[]>;
    findOne(idService: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(idService: number, updateServiceDto: UpdateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(idService: number): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        idService: number;
        titre: string;
        description: string | null;
        image: string | null;
        details: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
