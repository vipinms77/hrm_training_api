import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
