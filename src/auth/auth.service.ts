import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayloads';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jtwService: JwtService,
  ) {}

  login(user: User): UserToken {
    // Trasforma o user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jtwService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      //checar se a senha informada corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    // se chegar aqui, significa que não encontrou um user e/ou a senha não corresponde
    throw new Error('Email address or password provided is incorrect.');
  }
}
