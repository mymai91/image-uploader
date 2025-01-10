import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @IsEmail({}, { message: 'Provide a valid email' })
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  @ApiProperty({ example: 'password123' })
  password: string;
}
