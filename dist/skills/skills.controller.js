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
exports.SkillsController = void 0;
const common_1 = require("@nestjs/common");
const skills_dto_1 = require("./skills.dto");
const skills_service_1 = require("./skills.service");
const app_service_1 = require("../app.service");
let SkillsController = class SkillsController {
    constructor(skillService, appService) {
        this.skillService = skillService;
        this.appService = appService;
    }
    async createSkills(skills) {
        console.log(skills);
        const result = await this.skillService.insertSkill(skills?.skills);
        if (result) {
            return this.appService.generateSuccessResponse(result);
        }
        else {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSkills() {
        const data = await this.skillService.getAllSkills();
        return this.appService.generateSuccessResponse(data);
    }
    async searchSkill(search) {
        const data = await this.skillService.searchSkill(search);
        return this.appService.generateSuccessResponse(data);
    }
};
exports.SkillsController = SkillsController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [skills_dto_1.CreateSkillsDto]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "createSkills", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "getSkills", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillsController.prototype, "searchSkill", null);
exports.SkillsController = SkillsController = __decorate([
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skills_service_1.SkillsService,
        app_service_1.AppService])
], SkillsController);
//# sourceMappingURL=skills.controller.js.map