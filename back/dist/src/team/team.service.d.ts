import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
export declare class TeamService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTeamMemberDto: CreateTeamMemberDto): import(".prisma/client").Prisma.Prisma__TeamMemberClient<{
        id: number;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TeamMemberClient<{
        id: number;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTeamMemberDto: UpdateTeamMemberDto): import(".prisma/client").Prisma.Prisma__TeamMemberClient<{
        id: number;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TeamMemberClient<{
        id: number;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        image: string;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
