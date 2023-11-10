import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RoleService } from './role.service';
import { Role } from 'src/database/role.entity';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [
    {
      provide: 'ROLE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
      inject: ['DATA_SOURCE'],
    },
    RoleService,
  ],
  // exports: [TypeOrmModule],
})
export class RolesModule { }
