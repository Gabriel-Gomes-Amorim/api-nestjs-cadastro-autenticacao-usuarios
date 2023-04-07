import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('cadastro')
// swagger
@ApiTags('cadastro')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    if (!data) {
      return 'usuário não encontrado!';
    }
    return {
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Partial<UpdateUserDto>) {
    await this.userService.update(id, data);
    return {
      message: 'usuário atualizado!',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
