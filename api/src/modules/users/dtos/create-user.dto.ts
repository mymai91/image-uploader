import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  username: string;

  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  password: string;
}
