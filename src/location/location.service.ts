import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new Location();

    location.address = createLocationDto.address;
    location.address_city = createLocationDto.address_city;

    location.company = createLocationDto.company; // @IsNotEmpty() validation should ensure this is filled

    await this.locationRepository.save(location);

    return location;
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    return await this.locationRepository.findOneBy({ id });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.findOne(id);

    if (location) {
      location.address = updateLocationDto.address;
      location.address_city = updateLocationDto.address_city;

      location.company = updateLocationDto.company; // @IsNotEmpty() validation should ensure this is filled

      await this.locationRepository.save(location);
    }
    return location;
  }

  async remove(id: number) {
    const del = await this.locationRepository.delete(id);
    return { id };
  }
}
