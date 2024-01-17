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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../database/user.entity");
const typeorm_1 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(registerUserDto) {
        const { username, password } = registerUserDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new user_entity_1.User();
        user.username = username;
        user.password = hashedPassword;
        return this.userRepository.save(user);
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findOneByUserName(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async updateUser(id, userDetail) {
        try {
            if (Object.keys(userDetail).length > 0) {
                await this.userRepository.update(id, userDetail);
            }
            return { id };
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map