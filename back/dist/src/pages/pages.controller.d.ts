import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(): Promise<{
        idPage: number;
        nomPage: string;
        slug: string;
    }[]>;
    findOne(slug: string): Promise<any>;
}
