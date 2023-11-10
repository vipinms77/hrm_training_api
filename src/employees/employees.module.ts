import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/database/employee.entity';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { AppService } from 'src/app.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EMPLOYEE_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Employee),
      inject: ['DATA_SOURCE'],
    },
    EmployeeService,
    AppService,
  ],
})
export class EmployeesModule {}
