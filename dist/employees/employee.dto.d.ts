import { SkillsDto } from 'src/skills/skills.dto';
export declare class UpdateEmployeeDto {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    departmentId: number;
    roleId: number;
    skills: number[];
    dateOfJoining: string;
    salary: string;
    address: string;
    moreDetails: string;
}
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    department: number;
    role: number;
    skills: Array<number>;
    dateOfJoining: string;
    salary: string;
    address: string;
    moreDetails: string;
}
export interface EmployeeDto {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    departmentId: number;
    roleId: number;
    skills: Array<SkillsDto>;
    dateOfJoining: string;
    salary: string;
    address: string;
    moreDetails: string;
}
export declare class EmployeeSearchDto {
    limit: number;
    offset: number;
    sortBy: string;
    sortDir: 'ASC' | 'DESC';
    search: string;
    skillIds: string;
}
