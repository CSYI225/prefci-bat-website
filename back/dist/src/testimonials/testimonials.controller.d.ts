import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
export declare class TestimonialsController {
    private readonly testimonialsService;
    constructor(testimonialsService: TestimonialsService);
    create(createTestimonialDto: CreateTestimonialDto): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: number;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        content: string;
        avatar: string | null;
        rating: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        content: string;
        avatar: string | null;
        rating: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: number;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        content: string;
        avatar: string | null;
        rating: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTestimonialDto: UpdateTestimonialDto): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: number;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        content: string;
        avatar: string | null;
        rating: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: number;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        content: string;
        avatar: string | null;
        rating: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
