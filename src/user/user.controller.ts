import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCvUserInterceptor } from './interceptors/getCvUser.interceptor';
import { Public } from 'src/auth/Public';

export interface IUpdattePassword {
  password:string
  newPassword:string
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('read')
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(GetCvUserInterceptor)
  @Get('read/cv/:id')
  findProfileCv(@Param('id') id: string) {
    return this.userService.findProfileCv(+id);
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('updatePassword/:id')
  updatePassword(@Param('id') id: string, @Body() updateUserDto: IUpdattePassword) {
    return this.userService.updatePassword(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
