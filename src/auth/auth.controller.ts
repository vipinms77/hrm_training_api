import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.create(registerUserDto);
    delete user.password;
    return user;
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: RegisterUserDto) {
    return this.authService.signIn(signInDto);
  }
}
