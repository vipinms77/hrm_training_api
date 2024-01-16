import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';

const REFRESH_EXPIRY = '10m';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: RegisterUserDto) {
    const { username, password } = signInDto;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, username: user.username };
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: REFRESH_EXPIRY },
    );
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async renewToken(refreshToken: string) {
    let tokenDetails: any;
    try {
      tokenDetails = await this.jwtService.verifyAsync(refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.usersService.findOne(tokenDetails.sub);
    const payload = { sub: user.id, username: user.username };
    const newRefreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: REFRESH_EXPIRY },
    );
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken, refresh_token: newRefreshToken };

  }
}
