import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Endereço de email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Número de telefone do usuário' })
  @IsPhoneNumber('BR')
  telephone: string;
}
