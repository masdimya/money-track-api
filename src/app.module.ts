import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';


import { TransactionController } from './transactions/transaction.controller';
import { TransactionService } from './transactions/transaction.service';
import {Transaction} from './transactions/transaction.entity'

import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'masdimya',
      password: '1234567890',
      database: 'moneytrack',
      entities: [Transaction],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transaction])
  ],
  controllers: [AppController, TransactionController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
