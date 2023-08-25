import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from '../../../domain/user/services/user.service';
import { CreateUserDto } from 'src/domain/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/domain/user/dto/update-user.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
// swagger
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const user = await this.userService.create(createUserDto);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Usuario cadastrado com sucesso!', user });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao criar usuario!', error: error });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.findById(id);

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar usuario!', error: error });
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const user = await this.userService.update(id, updateUserDto);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Usuario atualizado com sucesso!', user });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao atualizar o usuario!', error: error });
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(+id);
  }
}
