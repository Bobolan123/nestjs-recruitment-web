import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { Api } from './entities/api.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Api) private readonly apiRepository: Repository<Api>,
  ) {}

  create(createApiDto: CreateApiDto) {
    const api = new Api()
    api.endpoint = createApiDto.endpoint
    api.description = createApiDto.description
    return this.apiRepository.save(api)
  }

  findAll() {
    return this.apiRepository.find()
  }

  findOne(id: number) {
    return this.apiRepository.findOne({
      where: {id}
    })
  }

  async update(id: number, updateApiDto: UpdateApiDto) {
    try {
      const existApi = await this.findOne(id);
      if (existApi) {
        existApi.endpoint = updateApiDto.endpoint
        existApi.description = updateApiDto.description
      }      
      return this.apiRepository.save(existApi)
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return this.apiRepository.delete(id)
  }
}
