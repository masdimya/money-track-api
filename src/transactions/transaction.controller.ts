import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto'
import {EditTransactionDto} from './dto/edit-transaction.dto'

import {TransactionService} from './transaction.service'
import { Transaction as TransactionEntity } from './transaction.entity'


@Controller('transaction')
export class TransactionController {
  
  constructor(private transactionService: TransactionService) {}


  @Get()
  getTransaction(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll()
  }

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
    return this.transactionService.create(createTransactionDto)
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: number): Promise<String> {
    return this.transactionService.delete(id)
  }

  @Put(':id')
  updateransaction(@Param('id') id: number, @Body() editTransactionDto: EditTransactionDto): Promise<String> {
    return this.transactionService.update(id, editTransactionDto)
  }

  @Get(':id')
  getTransactionById(@Param('id') id: number): Promise<TransactionEntity> {
    return this.transactionService.findOne(id)
  }
}
