import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserUtil } from '@/common/utils/user.utils';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  controllers: [UsersController],
  providers: [UsersService, UserUtil],
  exports: [UsersService, UserUtil],
})
export class UsersModule {}
