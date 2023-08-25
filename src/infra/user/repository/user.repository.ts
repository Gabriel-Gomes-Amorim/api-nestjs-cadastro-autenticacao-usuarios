import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export default class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepostitory: Repository<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userRepostitory.create(user);
  }

  public async save(user: User): Promise<User> {
    return this.userRepostitory.save(user);
  }

  public async findById(id: number): Promise<User | null> {
    const findUser = this.userRepostitory.findOne({
      where: {
        id,
      },
    });
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepostitory.findOne({
      where: {
        email,
      },
    });
  }

  public async remove(id: number): Promise<void> {
    await this.userRepostitory.delete(id);
  }
}
