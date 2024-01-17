import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataSource } from 'typeorm';
import { User } from 'src/database/user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
    UsersService,
    JwtService,
    AppService,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
