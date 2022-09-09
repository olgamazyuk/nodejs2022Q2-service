import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  version: number;

  @IsOptional()
  createdAt: number;

  @IsOptional()
  updatedAt: number;
}
