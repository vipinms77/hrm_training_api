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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const users_service_1 = require("./users.service");
const jwt_1 = require("@nestjs/jwt");
const app_service_1 = require("../app.service");
const updata_user_dto_1 = require("./updata-user.dto");
let UsersController = class UsersController {
    constructor(userService, jwtService, appService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.appService = appService;
    }
    decodeJwtAndGetUserName(auth) {
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(jwt, { json: true })?.username || '';
    }
    async getCurrentUserDetails(req) {
        const username = this.decodeJwtAndGetUserName(req.headers?.authorization);
        const data = await this.userService.findOneByUserName(username);
        if (data) {
            delete data.password;
            delete data.id;
        }
        return this.appService.generateSuccessResponse(data);
    }
    async updateCurrentUserDetails(req, userDetail) {
        const username = this.decodeJwtAndGetUserName(req.headers?.authorization);
        const user = await this.userService.findOneByUserName(username);
        delete userDetail['username'];
        const data = await this.userService.updateUser(user.id, userDetail);
        if (data) {
            return this.appService.generateSuccessResponse({});
        }
        else {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: data,
            });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUserDetails", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updata_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCurrentUserDetails", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        app_service_1.AppService])
], UsersController);
//# sourceMappingURL=users.controller.js.map