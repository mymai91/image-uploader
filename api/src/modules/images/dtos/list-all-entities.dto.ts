import { IsOptional } from 'class-validator';

export class ListAllEntities {
  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;
}
