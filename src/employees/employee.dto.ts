import { ApiProperty } from '@nestjs/swagger';
import { SkillsDto } from 'src/skills/skills.dto';

export class UpdateEmployeeDto {
  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  dob: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  designation: string;

  @ApiProperty({ required: false })
  departmentId: number;

  @ApiProperty({ required: false })
  roleId: number;

  @ApiProperty({ required: false })
  skills: number[];

  @ApiProperty({ required: false })
  dateOfJoining: string;

  @ApiProperty({ required: false })
  salary: string;

  @ApiProperty({ required: false })
  address: string;

  @ApiProperty({ required: false })
  moreDetails: string;
}

export class CreateEmployeeDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  dob: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  designation: string;

  @ApiProperty({ required: false })
  department: number;

  @ApiProperty({ required: false })
  role: number;

  @ApiProperty({ required: false })
  skills: Array<number>;

  @ApiProperty({ required: false })
  dateOfJoining: string;

  @ApiProperty({ required: false })
  salary: string;

  @ApiProperty({ required: false })
  address: string;

  @ApiProperty({ required: false })
  moreDetails: string;
}

export interface EmployeeDto {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  designation: string;
  departmentId: number;
  roleId: number;
  skills: Array<SkillsDto>;
  dateOfJoining: string;
  salary: string;
  address: string;
  moreDetails: string;
}
