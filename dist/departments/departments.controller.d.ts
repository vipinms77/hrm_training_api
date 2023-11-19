import { DepartmentService } from './department.service';
export declare class DepartmentsController {
    private departmentService;
    constructor(departmentService: DepartmentService);
    getDepartments(): Promise<any>;
}
