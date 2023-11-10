import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/database/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
  ) { }
  /**
   * Retrieves all employees from the database.
   *
   * @return {Promise<any>} A promise that resolves to the data of all employees.
   */
  async getAllEmployees(): Promise<any> {
    const data = await this.employeeRepository.findAndCount({
      relations: ['role', 'department'],
    });
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
      const insertData: any = await this.employeeRepository.insert({
        ...employeeDetail,
      });
      return insertData.raw[0].id;
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
        relations: ['role', 'department'],
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
      const data = await this.employeeRepository.update(id, employeeDetail);
      return data;
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
}
