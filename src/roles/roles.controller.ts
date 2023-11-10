import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RoleService) {}
  /**
   * Retrieves all roles.
   *
   * @return {Promise<any>} The roles data.
   */
  @Get()
  async getRoles(): Promise<any> {
    const data = await this.roleService.getAllRoles();
    return data;
  }
}
