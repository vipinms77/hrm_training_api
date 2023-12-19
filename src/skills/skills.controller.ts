import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateSkillsDto } from './skills.dto';
import { SkillsService } from './skills.service';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('skills')
export class SkillsController {
  constructor(
    private skillService: SkillsService,
    private appService: AppService,
  ) {}

  @Post('')
  async createSkills(@Body() skills: CreateSkillsDto): Promise<any> {
    console.log(skills);
    const result = await this.skillService.insertSkill(skills?.skills);
    if (result) {
      return this.appService.generateSuccessResponse(result);
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('')
  async getSkills(): Promise<any> {
    const data = await this.skillService.getAllSkills();
    return this.appService.generateSuccessResponse(data);
  }

  @Get('search')
  async searchSkill(@Query('search') search: string): Promise<any> {
    const data = await this.skillService.searchSkill(search);
    return this.appService.generateSuccessResponse(data);
  }
}
