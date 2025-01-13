// src/modules/images/images.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { UploadImageDto } from './dtos/uploadImage.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESS_OPTIONS } from '@/common/config/data.config';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserUtil } from '@/common/utils/user.utils';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    private usersService: UsersService,

    private userUtils: UserUtil,
  ) {}

  async create(
    file: Express.Multer.File,
    uploadImageDto: UploadImageDto,
    user: User,
  ): Promise<Image> {
    // const currentUser = await this.usersService.findById(user.id);

    // if (!currentUser) {
    //   throw new UnauthorizedException('User not authenticated');
    // }

    const currentUser = await this.userUtils.getCurrentUser(user.id);

    try {
      // Define the compressed file path
      const compressedFilename = `c-${file.filename}`;
      const compressedFilePath = path.join(
        path.dirname(file.path),
        compressedFilename,
      );

      // Compress the image using Sharp
      await sharp(file.path)
        .resize(COMPRESS_OPTIONS.width, COMPRESS_OPTIONS.height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: COMPRESS_OPTIONS.quality })
        .toFile(compressedFilePath);

      // Delete the original file
      fs.unlinkSync(file.path);

      // Create a new image entity
      const image = this.imageRepository.create({
        filename: compressedFilename,
        path: compressedFilePath,
        description: uploadImageDto.description,
        user: currentUser,
      });

      // Save and return the new image
      return await this.imageRepository.save(image);
    } catch (error) {
      // Clean up the file if there's an error
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }
}
