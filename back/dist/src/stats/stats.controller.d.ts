import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    create(createStatDto: CreateStatDto): import(".prisma/client").Prisma.Prisma__StatClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        value: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        value: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__StatClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        value: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateStatDto: UpdateStatDto): import(".prisma/client").Prisma.Prisma__StatClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        value: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__StatClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        value: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
