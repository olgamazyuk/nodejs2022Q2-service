import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassowrd: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
