import { Department } from './department.entity';
import { Role } from './role.entity';
import { Skill } from './skill.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    salary: string;
    dateOfJoining: string;
    department: Department;
    role: Role;
    address: string;
    moreDetails: string;
    skills: Skill[];
}
