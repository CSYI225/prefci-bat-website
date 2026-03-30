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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealisationsController = void 0;
const common_1 = require("@nestjs/common");
const realisations_service_1 = require("./realisations.service");
const create_realisation_dto_1 = require("./dto/create-realisation.dto");
const update_realisation_dto_1 = require("./dto/update-realisation.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RealisationsController = class RealisationsController {
    realisationsService;
    constructor(realisationsService) {
        this.realisationsService = realisationsService;
    }
    findAllCategories() {
        return this.realisationsService.findAllCategories();
    }
    create(createRealisationDto) {
        return this.realisationsService.create(createRealisationDto);
    }
    findAll() {
        return this.realisationsService.findAll();
    }
    findOne(id) {
        return this.realisationsService.findOne(id);
    }
    async update(id, updateRealisationDto) {
        try {
            return await this.realisationsService.update(id, updateRealisationDto);
        }
        catch (error) {
            console.error("Error in RealisationsController.update:", error);
            throw error;
        }
    }
    remove(id) {
        return this.realisationsService.remove(id);
    }
};
exports.RealisationsController = RealisationsController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RealisationsController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('realisations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_realisation_dto_1.CreateRealisationDto]),
    __metadata("design:returntype", void 0)
], RealisationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('realisations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RealisationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('realisations/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RealisationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('realisations/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_realisation_dto_1.UpdateRealisationDto]),
    __metadata("design:returntype", Promise)
], RealisationsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('realisations/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RealisationsController.prototype, "remove", null);
exports.RealisationsController = RealisationsController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [realisations_service_1.RealisationsService])
], RealisationsController);
//# sourceMappingURL=realisations.controller.js.map