import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // rota publica
  @IsPublic()
  @Post('login')
  //status code
  @HttpCode(HttpStatus.OK)
  //definindo qual guard vai ser usado
  @UseGuards(LocalAuthGuard)
  // swagger
  @ApiParam({ name: 'password', type: 'string', required: true })
  @ApiParam({ name: 'email', type: 'string', required: true })
  login(@Request() req: AuthRequest) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
