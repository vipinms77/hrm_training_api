import { Controller, Get, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentService) {}

  /**
   * Retrieves all departments.
   *
   * @return {Promise<any>} The data containing all departments.
   */
  @Get()
  async getDepartments(): Promise<any> {
    const data = await this.departmentService.getAllDepartments();
    return data;
  }
}
