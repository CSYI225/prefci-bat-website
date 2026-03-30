"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealisationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RealisationsService = class RealisationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapToClient(r) {
        if (!r)
            return null;
        return {
            idRealisation: r.idRealisation,
            titre: r.titre,
            descriptionProjet: r.descriptionProjet,
            descriptionClient: r.descriptionClient,
            imageAvant: r.imageAvant,
            imageApres: r.imageApres,
            idCategorie: r.idCategorie,
            nomClient: r.nomClient,
            dateRealisation: r.dateRealisation,
            categorie: r.categorie
        };
    }
    async create(dto) {
        const r = await this.prisma.realisation.create({
            data: {
                titre: dto.titre,
                descriptionProjet: dto.descriptionProjet,
                descriptionClient: dto.descriptionClient,
                imageAvant: dto.imageAvant,
                imageApres: dto.imageApres,
                idCategorie: dto.idCategorie,
                nomClient: dto.nomClient,
            },
        });
        return this.mapToClient(r);
    }
    async findAll() {
        const reals = await this.prisma.realisation.findMany({
            include: { categorie: true },
            orderBy: { idRealisation: 'desc' },
        });
        return reals.map(r => this.mapToClient(r));
    }
    async findOne(idRealisation) {
        const r = await this.prisma.realisation.findUnique({
            where: { idRealisation },
            include: { categorie: true },
        });
        return this.mapToClient(r);
    }
    async update(idRealisation, dto) {
        try {
            const r = await this.prisma.realisation.update({
                where: { idRealisation },
                data: {
                    titre: dto.titre,
                    descriptionProjet: dto.descriptionProjet,
                    descriptionClient: dto.descriptionClient,
                    imageAvant: dto.imageAvant,
                    imageApres: dto.imageApres,
                    idCategorie: dto.idCategorie,
                    nomClient: dto.nomClient,
                },
            });
            return this.mapToClient(r);
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Réalisation avec l'ID ${idRealisation} non trouvée.`);
            }
            console.error("Prisma Update Error:", error);
            throw error;
        }
    }
    async remove(idRealisation) {
        const r = await this.prisma.realisation.delete({
            where: { idRealisation },
        });
        return this.mapToClient(r);
    }
    async findAllCategories() {
        const cats = await this.prisma.category.findMany();
        return cats.map(c => ({
            idCategorie: c.idCategorie,
            nom: c.nom
        }));
    }
};
exports.RealisationsService = RealisationsService;
exports.RealisationsService = RealisationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RealisationsService);
//# sourceMappingURL=realisations.service.js.map