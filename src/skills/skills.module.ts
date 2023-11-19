import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { DataSource } from 'typeorm';
import { Skill } from 'src/database/skill.entity';
import { DatabaseModule } from 'src/database/database.module';
import { AppService } from 'src/app.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SkillsController],
  providers: [
    {
      provide: 'SKILL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Skill),
      inject: ['DATA_SOURCE'],
    },
    SkillsService,
    AppService,
  ],
})
export class SkillsModule {}
