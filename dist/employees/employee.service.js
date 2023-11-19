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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const employee_entity_1 = require("../database/employee.entity");
const typeorm_1 = require("typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async getAllEmployees(limit, offset, sortBy, sortDir, search) {
        const queryObj = {
            relations: ['role', 'department', 'skills'],
        };
        if (limit) {
            queryObj['take'] = limit || 10;
            queryObj['skip'] = offset || 0;
        }
        if (sortBy) {
            queryObj['order'] = {
                [sortBy]: sortDir || 'ASC',
            };
        }
        if (search) {
            queryObj['where'] = {
                firstName: (0, typeorm_1.Like)(`%${search}%`),
            };
        }
        const data = await this.employeeRepository.findAndCount(queryObj);
        return data;
    }
    async createEmployee(employeeDetail) {
        try {
            const skills = employeeDetail.skills;
            const insertData = await this.employeeRepository.insert({
                ...employeeDetail,
            });
            const employeeId = insertData.raw.insertId;
            if (skills?.length) {
                await this.insertSkills(employeeId, skills);
            }
            return { id: employeeId };
        }
        catch (err) {
            return err;
        }
    }
    async getEmployeeDetails(id) {
        try {
            const data = await this.employeeRepository.findOne({
                relations: ['role', 'department', 'skills'],
                where: { id: id },
            });
            return data;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async updateEmployee(id, employeeDetail) {
        try {
            const skills = employeeDetail.skills;
            if (skills) {
                delete employeeDetail.skills;
                await this.deleteAllEmployeeSkills(id);
                await this.insertSkills(id, skills);
            }
            await this.employeeRepository.update(id, employeeDetail);
            return { id };
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async deleteEmployee(id) {
        try {
            const data = await this.employeeRepository.delete(id);
            return data;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async insertSkills(employeeId, skillIds) {
        try {
            const data = await this.employeeRepository
                .createQueryBuilder()
                .relation(employee_entity_1.Employee, 'skills')
                .of(employeeId)
                .add(skillIds);
            return data;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async deleteAllEmployeeSkills(employeeId) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id: employeeId },
            });
            employee.skills = [];
            return await this.employeeRepository.save(employee);
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EMPLOYEE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map