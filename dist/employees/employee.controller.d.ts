import { EmployeeService } from './employee.service';
import { AppService } from 'src/app.service';
import { CreateEmployeeDto, EmployeeDto, UpdateEmployeeDto } from './employee.dto';
import { Employee } from 'src/database/employee.entity';
export declare class EmployeeController {
    private employeeService;
    private readonly appService;
    constructor(employeeService: EmployeeService, appService: AppService);
    getAllEmployees(limit?: number, offset?: number, sortBy?: string, sortDir?: 'ASC' | 'DESC'): Promise<any>;
    createEmployee(employeeDetail: CreateEmployeeDto): Promise<EmployeeDto>;
    getEmployeeDetails(id: number): Promise<any>;
    updateEmployee(id: number, employeeDetail: UpdateEmployeeDto): Promise<any>;
    deleteEmployee(id: number): Promise<Employee>;
}
