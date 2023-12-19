import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    RolesModule,
    DepartmentsModule,
    EmployeesModule,
    SkillsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
