import { Inject, Injectable } from '@nestjs/common';
import { Employee } from 'src/database/employee.entity';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
  ) {}
  /**
   * Retrieves all employees from the database.
   *
   * @return {Promise<any>} A promise that resolves to the data of all employees.
   */
  async getAllEmployees(
    limit: number,
    offset: number,
    sortBy: string,
    sortDir: string,
    search: string,
    skillIds: Array<number>,
  ): Promise<any> {
    const queryObj = {
      relations: ['role', 'department', 'skills'],
    };
    if (limit) {
      queryObj['take'] = limit || 10;
      queryObj['skip'] = offset || 0;
    }
    if (sortBy) {
      queryObj['order'] = {
        [sortBy]: sortDir || 'ASC',
      };
    }
    if (search) {
      queryObj['where'] = {
        firstName: Like(`%${search}%`),
      };
    }
    if (skillIds?.length > 0) {
      queryObj['where']['skills'] = { id: In(skillIds) };
    }
    const data = await this.employeeRepository.findAndCount(queryObj);
    return data;
  }
  /**
   * Creates an employee with the given employee details.
   *
   * @param {any} employeeDetail - The details of the employee.
   * @returns {Promise<any>} The ID of the newly created employee.
   */
  async createEmployee(employeeDetail: any): Promise<any> {
    try {
      const skills = employeeDetail.skills;
      const insertData: any = await this.employeeRepository.insert({
        ...employeeDetail,
      });
      const employeeId = insertData.raw.insertId;
      if (skills?.length) {
        await this.insertSkills(employeeId, skills);
      }
      return { id: employeeId };
    } catch (err) {
      return err;
    }
  }
  /**
   * Retrieves the details of an employee based on their ID.
   *
   * @param {number} id - The ID of the employee.
   * @return {Promise<any>} A promise that resolves to the employee details.
   */
  async getEmployeeDetails(id: number): Promise<any> {
    try {
      const data = await this.employeeRepository.findOne({
        relations: ['role', 'department', 'skills'],
        where: { id: id },
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * Updates an employee with the given id and employee details.
   *
   * @param {number} id - The id of the employee to be updated.
   * @param {any} employeeDetail - The updated employee details.
   * @return {Promise<any>} - A Promise that resolves with the updated employee data.
   */
  async updateEmployee(id: number, employeeDetail: any): Promise<any> {
    try {
      const skills = employeeDetail.skills;
      if (skills) {
        delete employeeDetail.skills;
        await this.deleteAllEmployeeSkills(id);
        await this.insertSkills(id, skills);
      }
      delete employeeDetail.skills;
      if (Object.keys(employeeDetail).length > 0) {
        await this.employeeRepository.update(id, employeeDetail);
      }
      return { id };
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * Deletes an employee with the given ID.
   *
   * @param {number} id - The ID of the employee to delete.
   * @return {Promise<any>} A promise that resolves to the deleted employee data.
   */
  async deleteEmployee(id: number): Promise<any> {
    try {
      const data = await this.employeeRepository.delete(id);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Inserts skills for an employee.
   *
   * @param {number} employeeId - The ID of the employee.
   * @param {Array<number | string>} skillIds - An array of skill IDs.
   * @return {Promise<any>} A promise that resolves with the inserted data.
   */
  async insertSkills(
    employeeId: number,
    skillIds: Array<number | string>,
  ): Promise<any> {
    try {
      const data = await this.employeeRepository
        .createQueryBuilder()
        .relation(Employee, 'skills')
        .of(employeeId)
        .add(skillIds);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes all the skills of an employee.
   *
   * @param {number} employeeId - The ID of the employee.
   * @return {Promise<any>} A promise that resolves to the updated employee object.
   */
  async deleteAllEmployeeSkills(employeeId: number): Promise<any> {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { id: employeeId },
      });
      employee.skills = [];
      return await this.employeeRepository.save(employee);
    } catch (err) {
      throw new Error(err);
    }
  }
}
