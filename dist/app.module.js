"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const roles_module_1 = require("./roles/roles.module");
const departments_module_1 = require("./departments/departments.module");
const employees_module_1 = require("./employees/employees.module");
const skills_module_1 = require("./skills/skills.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot(),
            roles_module_1.RolesModule,
            departments_module_1.DepartmentsModule,
            employees_module_1.EmployeesModule,
            skills_module_1.SkillsModule,
        ],
        providers: [app_service_1.AppService, config_1.ConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map