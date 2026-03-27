"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRealisationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_realisation_dto_1 = require("./create-realisation.dto");
class UpdateRealisationDto extends (0, mapped_types_1.PartialType)(create_realisation_dto_1.CreateRealisationDto) {
}
exports.UpdateRealisationDto = UpdateRealisationDto;
//# sourceMappingURL=update-realisation.dto.js.map