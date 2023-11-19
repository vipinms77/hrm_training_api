import { Skill } from 'src/database/skill.entity';
import { Repository } from 'typeorm';
export declare class SkillsService {
    private skillRepository;
    constructor(skillRepository: Repository<Skill>);
    insertSkill(skills: Array<string>): Promise<any>;
    getAllSkills(): Promise<any>;
    searchSkill(search: string): Promise<any>;
}
