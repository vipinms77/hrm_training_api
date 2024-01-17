import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { AppService } from 'src/app.service';
import {
  CreateEmployeeDto,
  EmployeeDto,
  EmployeeSearchDto,
  UpdateEmployeeDto,
} from './employee.dto';
import { Employee } from 'src/database/employee.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('employee')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private readonly appService: AppService,
  ) {}

  /**
   * Retrieves all employees.
   *
   * @return {Promise<Array<EmployeeDto>>} Returns a promise that resolves to an array of EmployeeDto objects.
   */
  @Get()
  async getAllEmployees(
    @Query()
    query: EmployeeSearchDto,
  ): Promise<any> {
    const { limit, offset, sortBy, sortDir, search, skillIds } = query;
    const skills: Array<number> = skillIds
      ? skillIds.split(',').map((x) => parseInt(x))
      : [];
    const [employees, count] = await this.employeeService.getAllEmployees(
      limit,
      offset,
      sortBy,
      sortDir,
      search,
      skills,
    );
    return this.appService.generateSuccessResponse({ employees, count });
  }

  /**
   * Creates a new employee with the provided details.
   *
   * @param {@Body() employeeDetail: CreateEmployeeDto} employeeDetail - The details of the employee to create.
   * @return {Promise<EmployeeDto>} The created employee.
   */
  @Post()
  async createEmployee(
    @Body() employeeDetail: CreateEmployeeDto,
  ): Promise<EmployeeDto> {
    const data: any = await this.employeeService.createEmployee(employeeDetail);
    if (data) {
      return this.appService.generateSuccessResponse(data);
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: data,
        },
      );
    }
  }

  /**
   * Retrieves the details of an employee.
   *
   * @param {number} id - The ID of the employee.
   * @return {Promise<any>} A promise that resolves with the employee details.
   */
  @Get(':id')
  async getEmployeeDetails(@Param('id') id: number): Promise<any> {
    const data = await this.employeeService.getEmployeeDetails(id);
    return this.appService.generateSuccessResponse(data);
  }

  /**
   * Retrieves the details of an employee using email.
   *
   * @param {number} id - The ID of the employee.
   * @return {Promise<any>} A promise that resolves with the employee details.
   */
  @Get('email/:email')
  async getEmployeeDetailsByEmail(@Param('email') email: string): Promise<any> {
    const data = await this.employeeService.getEmployeeDetailsUsingEmail(email);
    return this.appService.generateSuccessResponse(data);
  }

  /**
   * Updates an employee.
   *
   * @param {number} id - The ID of the employee to update.
   * @param {UpdateEmployeeDto} employeeDetail - The updated employee details.
   * @return {Promise<any>} A promise that resolves with the updated employee data.
   */
  @Patch(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() employeeDetail: UpdateEmployeeDto,
  ): Promise<any> {
    const data: any = await this.employeeService.updateEmployee(
      id,
      employeeDetail,
    );
    if (data) {
      return this.appService.generateSuccessResponse(data);
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: data,
        },
      );
    }
  }

  /**
   * Delete an employee by ID.
   *
   * @param {number} id - The ID of the employee to delete.
   * @return {Promise<any>} A Promise that resolves with the deleted employee data.
   */
  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<Employee> {
    const data = await this.employeeService.deleteEmployee(id);
    if (data) {
      return this.appService.generateSuccessResponse(data);
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: data,
        },
      );
    }
  }
}
