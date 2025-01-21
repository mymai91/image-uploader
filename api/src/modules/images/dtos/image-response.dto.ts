import { User } from '@/modules/users/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';

export class ImageResponseDto {
  @Expose()
  id: string;

  @Expose()
  filename: string;

  @Expose()
  path: string;

  @Expose()
  url: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  user: User;
}
