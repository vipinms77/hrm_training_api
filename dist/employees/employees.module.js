"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const employee_controller_1 = require("./employee.controller");
const employee_service_1 = require("./employee.service");
const employee_entity_1 = require("../database/employee.entity");
const database_module_1 = require("../database/database.module");
const app_service_1 = require("../app.service");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [employee_controller_1.EmployeeController],
        providers: [
            {
                provide: 'EMPLOYEE_REPOSITORY',
                useFactory: (dataSource) => dataSource.getRepository(employee_entity_1.Employee),
                inject: ['DATA_SOURCE'],
            },
            employee_service_1.EmployeeService,
            app_service_1.AppService,
        ],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map