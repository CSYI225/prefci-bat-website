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
exports.DevisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DevisService = class DevisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapToClient(d) {
        if (!d)
            return null;
        return {
            id_demande: d.idDemande,
            nom_client: d.nomClient,
            email: d.email,
            telephone: d.telephone,
            service_demande: d.serviceDemande,
            message: d.message,
            date_demande: d.dateDemande,
            statut: d.statut
        };
    }
    async findAll() {
        const devisList = await this.prisma.demandeDevis.findMany({
            orderBy: { idDemande: 'desc' },
        });
        return devisList.map(d => this.mapToClient(d));
    }
    async create(data) {
        const created = await this.prisma.demandeDevis.create({
            data: {
                nomClient: `${data.nom || ''} ${data.prenom || ''}`.trim(),
                email: data.email,
                telephone: data.telephone,
                serviceDemande: data.service,
                message: data.message,
                statut: 'en_attente'
            }
        });
        return this.mapToClient(created);
    }
    async updateStatut(idDemande, statut) {
        const updated = await this.prisma.demandeDevis.update({
            where: { idDemande },
            data: { statut },
        });
        return this.mapToClient(updated);
    }
};
exports.DevisService = DevisService;
exports.DevisService = DevisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevisService);
//# sourceMappingURL=devis.service.js.map