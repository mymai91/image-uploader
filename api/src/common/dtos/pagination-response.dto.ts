import { Expose } from 'class-transformer';

export class PaginationResponseDto<T> {
  @Expose() // Expose decorator is used to include the property in the transformation process
  items: T[]; // T[] means an array of items of type T. T is a generic type, which means that the type will be defined when the class is used

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  totalPages: number;
}
