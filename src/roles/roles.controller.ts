import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
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
