import { Department } from 'src/database/department.entity';
import { Repository } from 'typeorm';
export declare class DepartmentService {
    private repository;
    constructor(repository: Repository<Department>);
    getAllDepartments(searchString?: string): Promise<any>;
}
