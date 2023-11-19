import { CreateSkillsDto } from './skills.dto';
import { SkillsService } from './skills.service';
import { AppService } from 'src/app.service';
export declare class SkillsController {
    private skillService;
    private appService;
    constructor(skillService: SkillsService, appService: AppService);
    createSkills(skills: CreateSkillsDto): Promise<any>;
    getSkills(): Promise<any>;
    searchSkill(search: string): Promise<any>;
}
