import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import UserRepository from 'src/infra/user/repository/user.repository';
import { EmailException } from '../utils/email-exists';
import { IdNotFoundException } from '../utils/idnotfound';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const isEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (isEmailAlreadyExists) {
      throw new EmailException();
    }

    const createUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      telephone: createUserDto.telephone,
    };

    const newUser = await this.userRepository.create(createUser);

    const createdUser = await this.userRepository.save(newUser);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new IdNotFoundException(id);
    }

    const updateUser = {
      ...findUser,
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
      telephone: updateUserDto.password,
    };

    const updatedUser = await this.userRepository.create(updateUser);

    return {
      ...updateUser,
      password: undefined,
    };
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }

  /*Método para buscar dados do usuario para login*/
  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
