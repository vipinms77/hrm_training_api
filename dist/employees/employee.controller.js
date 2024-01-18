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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const app_service_1 = require("../app.service");
const employee_dto_1 = require("./employee.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let EmployeeController = class EmployeeController {
    constructor(employeeService, appService) {
        this.employeeService = employeeService;
        this.appService = appService;
    }
    async getAllEmployees(query) {
        const { limit, offset, sortBy, sortDir, search, skillIds } = query;
        const skills = skillIds
            ? skillIds.split(',').map((x) => parseInt(x))
            : [];
        const [employees, count] = await this.employeeService.getAllEmployees(limit, offset, sortBy, sortDir, search, skills);
        return this.appService.generateSuccessResponse({ employees, count });
    }
    async createEmployee(employeeDetail) {
        if (employeeDetail.email) {
            const getEmployeeDetailsByEmail = await this.employeeService.getEmployeeDetailsUsingEmail(employeeDetail.email);
            if (getEmployeeDetailsByEmail?.id) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT, {
                    cause: {},
                });
            }
        }
        const data = await this.employeeService.createEmployee(employeeDetail);
        if (data) {
            return this.appService.generateSuccessResponse(data);
        }
        else {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: data,
            });
        }
    }
    async getEmployeeDetails(id) {
        const data = await this.employeeService.getEmployeeDetails(id);
        return this.appService.generateSuccessResponse(data);
    }
    async getEmployeeDetailsByEmail(email) {
        const data = await this.employeeService.getEmployeeDetailsUsingEmail(email);
        return this.appService.generateSuccessResponse(data);
    }
    async updateEmployee(id, employeeDetail) {
        if (employeeDetail.email) {
            const getEmployeeDetailsByEmail = await this.employeeService.getEmployeeDetailsUsingEmail(employeeDetail.email);
            if (getEmployeeDetailsByEmail && getEmployeeDetailsByEmail?.id != id) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT, {
                    cause: {},
                });
            }
        }
        const data = await this.employeeService.updateEmployee(id, employeeDetail);
        if (data) {
            return this.appService.generateSuccessResponse(data);
        }
        else {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: data,
            });
        }
    }
    async deleteEmployee(id) {
        const data = await this.employeeService.deleteEmployee(id);
        if (data) {
            return this.appService.generateSuccessResponse(data);
        }
        else {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: data,
            });
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.EmployeeSearchDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAllEmployees", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeDetails", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeDetailsByEmail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployee", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        app_service_1.AppService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map