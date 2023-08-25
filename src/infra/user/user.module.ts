import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/services/user.service';
import { UserController } from './http/user.controller';
import { UserProviders } from './repository/user.providers';
import UserRepository from './repository/user.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
