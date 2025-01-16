import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/images.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { BullModule } from '@nestjs/bull';
import { ImageDeleteProcessor } from './queues/image-delete.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, User]),
    MulterModule.register({
      dest: './uploads',
    }),
    BullModule.registerQueue({
      name: 'image-delete',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageDeleteProcessor],
  exports: [ImagesService],
})
export class ImagesModule {}
