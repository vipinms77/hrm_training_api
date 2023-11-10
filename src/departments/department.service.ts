import { Inject, Injectable } from '@nestjs/common';
import { Department } from 'src/database/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private repository: Repository<Department>,
  ) {}
  
  /**
   * Retrieves all departments from the database.
   *
   * @param {string} [searchString] - The search string to filter departments by name.
   * @return {Promise<any>} - A promise that resolves to an array of department objects.
   */
  async getAllDepartments(searchString?: string): Promise<any> {
    const query = this.repository.createQueryBuilder('department');

    if (searchString) {
      const name = `%${searchString}%`;
      query.where('role ILIKE :name', { name });
    }

    const data = await query.getMany();
    return data;
  }
}
