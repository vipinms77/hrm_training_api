import { Role } from 'src/database/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    getAllRoles(searchString?: string): Promise<any>;
}
