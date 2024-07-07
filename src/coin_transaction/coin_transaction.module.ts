import { Module } from '@nestjs/common';
import { CoinTransactionService } from './coin_transaction.service';
import { CoinTransactionController } from './coin_transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinTransaction } from './entities/coin_transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinTransaction])],
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService],
})
export class CoinTransactionModule {}
