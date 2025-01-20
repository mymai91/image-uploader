import { UserResponseDto } from '@/modules/users/dtos/user-response.dto copy';
import { Expose } from 'class-transformer';

export class SignInResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  user: UserResponseDto;
}
