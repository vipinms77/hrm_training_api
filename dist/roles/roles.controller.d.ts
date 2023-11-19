import { RoleService } from './role.service';
export declare class RolesController {
    private roleService;
    constructor(roleService: RoleService);
    getRoles(): Promise<any>;
}
