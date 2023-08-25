import { HttpException, HttpStatus } from '@nestjs/common';

export class IdNotFoundException extends HttpException {
  constructor(id: number) {
    super(`O ${id} não foi encontrado!`, HttpStatus.NOT_FOUND);
  }
}
