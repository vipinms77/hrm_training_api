import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    nullable: true,
    type: 'date',
    transformer: {
      to(value: string): Date | null {
        return value ? new Date(value) : null;
      },
      from(value: string): string | null {
        return value ? value : null;
      },
    },
  })
  dob: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({
    nullable: true,
    type: 'date',
    transformer: {
      to(value: string): Date | null {
        return value ? new Date(value) : null;
      },
      from(value: string): string {
        return value ? value : null;
      },
    },
  })
  dateOfJoining: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  moreDetails: string;
}
