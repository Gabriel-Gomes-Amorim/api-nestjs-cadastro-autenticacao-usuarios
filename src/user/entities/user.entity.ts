import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @ApiProperty() => Swagger

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ required: true })
  @Column({ length: 250 })
  telephone: string;

  @ApiProperty({ required: true })
  @Column({ length: 100 })
  email: string;

  @ApiProperty({ required: true })
  @Column({ length: 100 })
  password: string;
}
