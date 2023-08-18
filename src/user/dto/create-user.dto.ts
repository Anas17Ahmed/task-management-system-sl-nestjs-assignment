// src/user/dto/create-user.dto.ts
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
