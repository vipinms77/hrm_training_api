import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    RolesModule,
    DepartmentsModule,
    EmployeesModule,
  ],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
