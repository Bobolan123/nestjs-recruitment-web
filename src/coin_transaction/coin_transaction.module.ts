import { Module } from '@nestjs/common';
import { CoinTransactionService } from './coin_transaction.service';
import { CoinTransactionController } from './coin_transaction.controller';

@Module({
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService],
})
export class CoinTransactionModule {}
