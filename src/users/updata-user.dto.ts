import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  dob: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  designation: string;

  @ApiProperty({ required: false })
  dateOfJoining: string;

  @ApiProperty({ required: false })
  address: string;

  @ApiProperty({ required: false })
  moreDetails: string;
}
