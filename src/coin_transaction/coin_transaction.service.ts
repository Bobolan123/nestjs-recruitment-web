import { Injectable } from '@nestjs/common';
import { CreateCoinTransactionDto } from './dto/create-coin_transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin_transaction.dto';

@Injectable()
export class CoinTransactionService {
  create(createCoinTransactionDto: CreateCoinTransactionDto) {
    return 'This action adds a new coinTransaction';
  }

  findAll() {
    return `This action returns all coinTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coinTransaction`;
  }

  update(id: number, updateCoinTransactionDto: UpdateCoinTransactionDto) {
    return `This action updates a #${id} coinTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} coinTransaction`;
  }
}
