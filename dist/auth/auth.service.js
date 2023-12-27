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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const REFRESH_EXPIRY = '2h';
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(signInDto) {
        const { username, password } = signInDto;
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const passwordIsValid = await user.validatePassword(password);
        if (!passwordIsValid) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const payload = { sub: user.id, username: user.username };
        const refreshToken = await this.jwtService.signAsync({ sub: user.id }, { expiresIn: REFRESH_EXPIRY });
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: accessToken, refresh_token: refreshToken };
    }
    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (user && (await user.validatePassword(password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async renewToken(refreshToken) {
        let tokenDetails;
        try {
            tokenDetails = await this.jwtService.verifyAsync(refreshToken);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const user = await this.usersService.findOne(tokenDetails.sub);
        const payload = { sub: user.id, username: user.username };
        const newRefreshToken = await this.jwtService.signAsync({ sub: user.id }, { expiresIn: REFRESH_EXPIRY });
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: accessToken, refresh_token: newRefreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map