import { Injectable } from '@nestjs/common';
import { Transaction } from './interfaces/transaction.interface';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction as TransactionEntity } from './transaction.entity'

@Injectable()
export class TransactionService {
  private readonly transactions: Transaction[] = []

  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  create(trans: Transaction): Promise<TransactionEntity> {
    const transaction = new TransactionEntity()
    transaction.trans_name = trans.trans_name
    transaction.trans_date = trans.trans_date 
    transaction.trans_amount = trans.trans_amount  

    return this.transactionRepository.save(transaction)
  }

  findAll(): Promise<TransactionEntity[]>{
    return TransactionEntity.find({
      select: [
        'id',
        'trans_name',
        'trans_date',
        'trans_amount'
      ],
      order: {
        trans_date: "ASC",
        created_at: "ASC",
      },
    })
  }

  findOne(id: number): Promise<TransactionEntity>{
    return TransactionEntity.findOne({
      where: {
        id: id,
      },
    })

  }

  async update(id: number, trans: Transaction): Promise<string>{
    const transaction = await TransactionEntity.findOne({
      where: {
        id: id,
      }
    })


    if(transaction){
      transaction.trans_name = trans.trans_name
      transaction.trans_date = trans.trans_date 
      transaction.trans_amount = trans.trans_amount
  
      await transaction.save()

    }


    return 'success update transaction'
  }
  

  async delete(id: number): Promise<string>{
    const transaction = await TransactionEntity.findOne({
      where: {
        id: id,
      }
    })

    transaction.deleted_at = new Date()
    await transaction.save()

    return 'success delete transaction'
  }


}
