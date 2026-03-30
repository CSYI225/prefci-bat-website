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
exports.AdminContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminContentService = class AdminContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPageContent(slug) {
        const page = await this.prisma.page.findUnique({
            where: { slug },
            include: {
                sections: {
                    include: {
                        champs: {
                            include: { valeurs: true }
                        },
                        blocs: true
                    }
                }
            }
        });
        if (!page)
            throw new common_1.NotFoundException('Page non trouvée');
        const result = {};
        for (const section of page.sections) {
            const sectionData = {};
            const arraysData = {};
            for (const champ of section.champs) {
                for (const valeur of champ.valeurs) {
                    if (valeur.idBloc === null) {
                        sectionData[champ.nomChamp] = valeur.contenu;
                    }
                    else {
                        const bId = valeur.idBloc;
                        if (!arraysData[bId])
                            arraysData[bId] = { id: bId };
                        arraysData[bId][champ.nomChamp] = valeur.contenu;
                    }
                }
            }
            const blocsItems = Object.values(arraysData);
            let arrayKeyName = "items";
            if (section.nomSection === 'nosServices')
                arrayKeyName = 'services';
            if (section.nomSection === 'nosPartenaires')
                arrayKeyName = 'partenaires';
            if (section.nomSection === 'avisClients')
                arrayKeyName = 'avis';
            if (section.nomSection === 'pourquoiTravailler')
                arrayKeyName = 'raisons';
            if (section.nomSection === 'equipe')
                arrayKeyName = 'membres';
            if (Object.keys(sectionData).length === 0 && blocsItems.length > 0) {
                result[section.nomSection] = blocsItems;
            }
            else {
                result[section.nomSection] = { ...sectionData };
                if (blocsItems.length > 0) {
                    result[section.nomSection][arrayKeyName] = blocsItems;
                }
                else {
                    if (arrayKeyName !== "items") {
                        result[section.nomSection][arrayKeyName] = [];
                    }
                }
            }
            if (['stats', 'infos'].includes(section.nomSection) && blocsItems.length === 0) {
                result[section.nomSection] = [];
            }
        }
        return result;
    }
    async patchSection(slug, sectionKey, data) {
        const page = await this.prisma.page.findUnique({ where: { slug } });
        if (!page)
            throw new common_1.NotFoundException('Page introuvable');
        const section = await this.prisma.section.findFirst({
            where: { idPage: page.idPage, nomSection: sectionKey },
            include: { champs: true }
        });
        if (!section)
            throw new common_1.NotFoundException('Section introuvable dans cette page');
        if (Array.isArray(data)) {
            await this.prisma.bloc.deleteMany({ where: { idSection: section.idSection } });
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const bloc = await this.prisma.bloc.create({ data: { idSection: section.idSection, ordre: i } });
                for (const [key, value] of Object.entries(item)) {
                    if (key === 'id')
                        continue;
                    const champ = section.champs.find(c => c.nomChamp === key);
                    if (champ) {
                        await this.prisma.valeur.create({
                            data: {
                                idChamp: champ.idChamp,
                                idBloc: bloc.idBloc,
                                contenu: value !== null && value !== undefined ? String(value) : ""
                            }
                        });
                    }
                }
            }
        }
        else if (typeof data === 'object') {
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value)) {
                    await this.prisma.bloc.deleteMany({ where: { idSection: section.idSection } });
                    for (let i = 0; i < value.length; i++) {
                        const item = value[i];
                        const bloc = await this.prisma.bloc.create({ data: { idSection: section.idSection, ordre: i } });
                        for (const [iKey, iValue] of Object.entries(item)) {
                            if (iKey === 'id')
                                continue;
                            const champ = section.champs.find(c => c.nomChamp === iKey);
                            if (champ) {
                                await this.prisma.valeur.create({
                                    data: { idChamp: champ.idChamp, idBloc: bloc.idBloc, contenu: iValue !== null && iValue !== undefined ? String(iValue) : "" }
                                });
                            }
                        }
                    }
                }
                else {
                    const champ = section.champs.find(c => c.nomChamp === key);
                    if (champ) {
                        const existingRootVal = await this.prisma.valeur.findFirst({
                            where: { idChamp: champ.idChamp, idBloc: null }
                        });
                        if (existingRootVal) {
                            await this.prisma.valeur.update({
                                where: { idValeur: existingRootVal.idValeur },
                                data: { contenu: value !== null && value !== undefined ? String(value) : "" }
                            });
                        }
                        else {
                            await this.prisma.valeur.create({
                                data: { idChamp: champ.idChamp, idBloc: null, contenu: value !== null && value !== undefined ? String(value) : "" }
                            });
                        }
                    }
                }
            }
        }
        return { success: true };
    }
};
exports.AdminContentService = AdminContentService;
exports.AdminContentService = AdminContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminContentService);
//# sourceMappingURL=admin-content.service.js.map