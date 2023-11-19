import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillsDto {
  @ApiProperty({ required: true })
  skills: Array<string>;
}

export interface SkillsDto {
  id: number;
  skill: string;
}