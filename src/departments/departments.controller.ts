import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './department.service';

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
