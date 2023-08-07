import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Use sqlite as the database
      database: ':memory:', // Use in-memory database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create database tables (for demonstration purposes, you can set it to false for production)
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
