import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUtil {
  constructor(private readonly userService: UsersService) {}

  async getCurrentUser(userId: number) {
    return this.userService.findById(userId);
  }
}
