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

  async create(createApiDto: CreateApiDto) {
    const api = new Api();
    api.endpoint = createApiDto.endpoint;
    api.description = createApiDto.description;
    api.method = createApiDto.method;
    api.module = createApiDto.module;
    const savedApi = await this.apiRepository.save(api);
    savedApi;
    return savedApi
  }

  async findAll() {
    const apis = await this.apiRepository.find();
    // Sort the apis array in ascending order by id
    apis.sort((a, b) => a.id - b.id);

    return apis;
  }

  async readForRole() {
    const apis = await this.apiRepository.find();
    // Sort the apis array in ascending order by id
    apis.sort((a, b) => a.id - b.id);

    return apis;
  }

  async findOne(id: number) {
    const api = await this.apiRepository.findOne({ where: { id } });
    if (api) {
      return api;
    } else {
      return {
        statusCode: 404,
        message: 'Api not found',
      };
    }
  }

  async update(id: number, updateApiDto: UpdateApiDto) {
    const existApi = await this.apiRepository.findOne({
      where: { id },
    });
    existApi.endpoint = updateApiDto.endpoint || existApi.endpoint;
    existApi.description = updateApiDto.description || existApi.description;
    existApi.method = updateApiDto.method || existApi.method;
    existApi.module = updateApiDto.module || existApi.module;
    const updatedApi = await this.apiRepository.save(existApi);
    return updatedApi;
  }

  async remove(id: number) {
      const deleteResult = await this.apiRepository.delete(id);
      if (deleteResult) {
        return {}
      } else {
        return "Error"
      }
   
  }
}
