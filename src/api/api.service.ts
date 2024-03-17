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
    try {
      const api = new Api();
      api.endpoint = createApiDto.endpoint;
      api.description = createApiDto.description;
      api.method = createApiDto.method;
      api.module = createApiDto.module;
      const savedApi = await this.apiRepository.save(api);
      return {
        statusCode: 201,
        message: 'Api created successfully',
        data: savedApi,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const apis = await this.apiRepository.find();
      // Sort the apis array in ascending order by id
      apis.sort((a, b) => a.id - b.id);

      return {
        statusCode: 200,
        message: 'Apis retrieved successfully',
        data: apis,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const api = await this.apiRepository.findOne({ where: { id } });
      if (api) {
        return {
          statusCode: 200,
          message: 'Api found',
          data: api,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Api not found',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async update(id: number, updateApiDto: UpdateApiDto) {
    try {
      const existApi = await this.apiRepository.findOne({
        where: { id },
      });
      if (existApi instanceof Api) {
        existApi.endpoint = updateApiDto.endpoint;
        existApi.description = updateApiDto.description;
        existApi.method = updateApiDto.method;
        existApi.module = updateApiDto.module;
        const updatedApi = await this.apiRepository.save(existApi);
        return {
          statusCode: 200,
          message: 'Api updated successfully',
          data: updatedApi,
        };
      } else {
        return existApi; // It may return either 404 or 500 response
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await this.apiRepository.delete(id);
      if (deleteResult.affected === 1) {
        return {
          statusCode: 200,
          message: `Api with ID ${id} removed successfully`,
        };
      } else {
        return {
          statusCode: 404,
          message: `Api with ID ${id} not found`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
