import { PartialType } from '@nestjs/swagger';
import { CreateCoinTransactionDto } from './create-coin_transaction.dto';

export class UpdateCoinTransactionDto extends PartialType(CreateCoinTransactionDto) {}
