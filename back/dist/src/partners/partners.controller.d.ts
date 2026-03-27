import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
export declare class PartnersController {
    private readonly partnersService;
    constructor(partnersService: PartnersService);
    create(createPartnerDto: CreatePartnerDto): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        logo: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        logo: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        logo: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePartnerDto: UpdatePartnerDto): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        logo: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        logo: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
