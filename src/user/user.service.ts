import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      //pegar todos os dados de createUserDto
      ...createUserDto,
      //substituindo a senha do usuario por uma hash
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createdUser = await this.userRepository.save(data);
    return {
      //pegar todos os dados de createUserDto
      ...createdUser,
      //undefined para não retornar a hash da senha
      password: undefined,
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<UpdateUserDto>) {
    await this.userRepository.update({ id }, data);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
    return { deleted: true };
  }

  /*Método para buscar dados do usuario para login*/
  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
