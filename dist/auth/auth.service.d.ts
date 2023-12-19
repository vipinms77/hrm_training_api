import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(signInDto: RegisterUserDto): Promise<{
        access_token: string;
    }>;
    validateUser(username: string, password: string): Promise<any>;
}
