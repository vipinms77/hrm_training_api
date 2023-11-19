"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_controller_1 = require("./roles.controller");
const role_service_1 = require("./role.service");
const role_entity_1 = require("../database/role.entity");
const database_module_1 = require("../database/database.module");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [roles_controller_1.RolesController],
        providers: [
            {
                provide: 'ROLE_REPOSITORY',
                useFactory: (dataSource) => dataSource.getRepository(role_entity_1.Role),
                inject: ['DATA_SOURCE'],
            },
            role_service_1.RoleService,
        ],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map