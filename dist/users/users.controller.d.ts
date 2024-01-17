import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { Request } from 'express';
import { UpdateUserDto } from './updata-user.dto';
export declare class UsersController {
    private userService;
    private readonly jwtService;
    private readonly appService;
    constructor(userService: UsersService, jwtService: JwtService, appService: AppService);
    private decodeJwtAndGetUserName;
    getCurrentUserDetails(req: Request): Promise<any>;
    updateCurrentUserDetails(req: Request, userDetail: UpdateUserDto): Promise<any>;
}
