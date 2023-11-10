import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[];
}
