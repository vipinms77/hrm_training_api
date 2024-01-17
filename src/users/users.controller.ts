import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { Request } from 'express';
import { UpdateUserDto } from './updata-user.dto';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
  ) {}

  private decodeJwtAndGetUserName(auth: string): string {
    const jwt = auth.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true })?.username || '';
  }

  @Get('me')
  async getCurrentUserDetails(@Req() req: Request): Promise<any> {
    const username = this.decodeJwtAndGetUserName(req.headers?.authorization);
    const data = await this.userService.findOneByUserName(username);
    if (data) {
      delete data.password;
      delete data.id;
    }
    return this.appService.generateSuccessResponse(data);
  }

  @Patch('me')
  async updateCurrentUserDetails(
    @Req() req: Request,
    @Body() userDetail: UpdateUserDto,
  ): Promise<any> {
    const username = this.decodeJwtAndGetUserName(req.headers?.authorization);
    const user = await this.userService.findOneByUserName(username);
    delete userDetail['username'];
    const data = await this.userService.updateUser(user.id, userDetail);
    if (data) {
      return this.appService.generateSuccessResponse({});
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: data,
        },
      );
    }
  }
}
