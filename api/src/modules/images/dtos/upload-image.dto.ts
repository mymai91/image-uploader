import { IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsOptional()
  description?: string;
}
