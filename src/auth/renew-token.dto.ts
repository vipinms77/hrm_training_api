import { ApiProperty } from '@nestjs/swagger';

export class RenewTokenDto {
  @ApiProperty({ required: true })
  refreshToken: string;
}
