import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { UploadImageDto } from './dtos/upload-image.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESS_OPTIONS } from '@/common/config/data.config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(
    file: Express.Multer.File,
    uploadImageDto: UploadImageDto,
    user: User,
  ): Promise<Image> {
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

    // Delete the original file if you don't need it
    fs.unlinkSync(file.path);

    // Save the compressed file details in the database with user information
    const image = this.imageRepository.create({
      filename: compressedFilename,
      path: compressedFilePath,
      description: uploadImageDto.description,
      user: user, // Associate the image with the user
    });

    return this.imageRepository.save(image);
  }
}
