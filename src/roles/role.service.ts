import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * Retrieves all roles from the database.
   *
   * @param {string} [searchString] - A string to search for in the role name.
   * @return {Promise<any>} - A promise that resolves to an array of role objects.
   */
  async getAllRoles(searchString?: string): Promise<any> {
    const query = this.roleRepository.createQueryBuilder('role');

    if (searchString) {
      const name = `%${searchString}%`;
      query.where('role ILIKE :name', { name });
    }

    const data = await query.getMany();
    return data;
  }
}
