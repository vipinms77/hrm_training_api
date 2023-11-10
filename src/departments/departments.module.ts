import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentService } from './department.service';
import { Department } from 'src/database/department.entity';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentsController],
  providers: [
    {
      provide: 'DEPARTMENT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Department),
      inject: ['DATA_SOURCE'],
    },
    DepartmentService,
  ],
})
export class DepartmentsModule {}
