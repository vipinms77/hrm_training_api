import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}