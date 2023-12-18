import { EmployeeService } from './employee.service';
import { AppService } from 'src/app.service';
import { CreateEmployeeDto, EmployeeDto, EmployeeSearchDto, UpdateEmployeeDto } from './employee.dto';
import { Employee } from 'src/database/employee.entity';
export declare class EmployeeController {
    private employeeService;
    private readonly appService;
    constructor(employeeService: EmployeeService, appService: AppService);
    getAllEmployees(query: EmployeeSearchDto): Promise<any>;
    createEmployee(employeeDetail: CreateEmployeeDto): Promise<EmployeeDto>;
    getEmployeeDetails(id: number): Promise<any>;
    updateEmployee(id: number, employeeDetail: UpdateEmployeeDto): Promise<any>;
    deleteEmployee(id: number): Promise<Employee>;
}
