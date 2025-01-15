import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUtil {
  constructor(private readonly userService: UsersService) {}

  async getCurrentUser(email: string) {
    return this.userService.findByEmail(email);
  }
}
