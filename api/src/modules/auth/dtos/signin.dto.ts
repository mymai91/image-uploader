import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  password: string;
}
