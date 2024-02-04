import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { Api } from './entities/api.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Api])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
