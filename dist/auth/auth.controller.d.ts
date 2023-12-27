import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
import { RenewTokenDto } from './renew-token.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signUp(registerUserDto: RegisterUserDto): Promise<import("../database/user.entity").User>;
    signIn(signInDto: RegisterUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    renewToken(renewToken: RenewTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
