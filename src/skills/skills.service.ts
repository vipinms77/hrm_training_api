import { Inject, Injectable } from '@nestjs/common';
import { Skill } from 'src/database/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @Inject('SKILL_REPOSITORY')
    private skillRepository: Repository<Skill>,
  ) {}
  /**
   * Inserts an array of skills into the 'skill' table.
   *
   * @param {Array<string>} skills - The skills to be inserted.
   * @return {Promise<any>} A promise that resolves with the execution result.
   */
  async insertSkill(skills: Array<string>): Promise<any> {
    const insertArr = skills.map((skill) => ({ skill }));
    const query = this.skillRepository.createQueryBuilder('skill');
    const data = await query.insert().into('skill').values(insertArr).execute();
    return data;
  }

  /**
   * Retrieves all skills from the skill repository.
   *
   * @return {Promise<any>} The retrieved skills.
   */
  async getAllSkills(): Promise<any> {
    const query = this.skillRepository.createQueryBuilder('skill');
    const data = await query.getMany();
    return data;
  }

  async searchSkill(search: string): Promise<any> {
    const query = this.skillRepository.createQueryBuilder('skill');
    const data = await query
      .where('skill LIKE :search', { search: `%${search}%` })
      .getMany();
    return data;
  }
}
