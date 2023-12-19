import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;
}
