import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinTransactionService } from './coin_transaction.service';
import { CreateCoinTransactionDto } from './dto/create-coin_transaction.dto';
import { UpdateCoinTransactionDto } from './dto/update-coin_transaction.dto';

@Controller('coin-transaction')
export class CoinTransactionController {
  constructor(private readonly coinTransactionService: CoinTransactionService) {}

  @Post()
  create(@Body() createCoinTransactionDto: CreateCoinTransactionDto) {
    return this.coinTransactionService.create(createCoinTransactionDto);
  }

  @Get()
  findAll() {
    return this.coinTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinTransactionDto: UpdateCoinTransactionDto) {
    return this.coinTransactionService.update(+id, updateCoinTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinTransactionService.remove(+id);
  }
}
