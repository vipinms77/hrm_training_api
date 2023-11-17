import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { Role } from './role.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true,
    type: 'date',
    transformer: {
      to(value: string): Date {
        return new Date(value);
      },
      from(value: string): string {
        return value;
      },
    },
  })
  dob: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  salary: string;

  @Column({
    nullable: true,
    type: 'date',
    transformer: {
      to(value: string): Date {
        return new Date(value);
      },
      from(value: string): string {
        return value;
      },
    },
  })
  dateOfJoining: string;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  @ManyToOne(() => Role, (role) => role.employees)
  role: Role;

  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  moreDetails: string;
}
