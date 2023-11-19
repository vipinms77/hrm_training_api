import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill: string;

  @ManyToMany(() => Employee, (employee) => employee.skills)
  @JoinTable({
    name: 'employee_skill',
  })
  employees: Employee[];
}
