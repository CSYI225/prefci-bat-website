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
exports.DevisController = void 0;
const common_1 = require("@nestjs/common");
const devis_service_1 = require("./devis.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DevisController = class DevisController {
    devisService;
    constructor(devisService) {
        this.devisService = devisService;
    }
    findAll() {
        return this.devisService.findAll();
    }
    updateStatut(id, statut) {
        return this.devisService.updateStatut(id, statut);
    }
};
exports.DevisController = DevisController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DevisController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/statut'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('statut')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], DevisController.prototype, "updateStatut", null);
exports.DevisController = DevisController = __decorate([
    (0, common_1.Controller)('admin/devis'),
    __metadata("design:paramtypes", [devis_service_1.DevisService])
], DevisController);
//# sourceMappingURL=devis.controller.js.map