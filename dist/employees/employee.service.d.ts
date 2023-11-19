import { Employee } from 'src/database/employee.entity';
import { Repository } from 'typeorm';
export declare class EmployeeService {
    private employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    getAllEmployees(limit: number, offset: number, sortBy: string, sortDir: string, search: string): Promise<any>;
    createEmployee(employeeDetail: any): Promise<any>;
    getEmployeeDetails(id: number): Promise<any>;
    updateEmployee(id: number, employeeDetail: any): Promise<any>;
    deleteEmployee(id: number): Promise<any>;
    insertSkills(employeeId: number, skillIds: Array<number | string>): Promise<any>;
    deleteAllEmployeeSkills(employeeId: number): Promise<any>;
}
