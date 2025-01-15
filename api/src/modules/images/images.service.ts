// src/modules/images/images.service.ts
import { COMPRESS_OPTIONS } from '@/common/config/data.config';
import { UserUtil } from '@/common/utils/user.utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UploadImageDto } from './dtos/upload-image.dto';
import { Image } from './entities/images.entity';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { plainToClass } from 'class-transformer';
import { ImageResponseDto } from './dtos/image-response.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    private userUtils: UserUtil,
  ) {}

  async create(
    file: Express.Multer.File,
    uploadImageDto: UploadImageDto,
    user: User,
  ): Promise<Image> {
    const currentUser = await this.userUtils.getCurrentUser(user.email);

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

  async getAll(
    user: User,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginationResponseDto<ImageResponseDto>> {
    const currentUser = await this.userUtils.getCurrentUser(user.email);

    const { limit = 10, page = 1 } = paginationQuery;
    const skip = (page - 1) * limit;

    // Without pagination
    // const images = await this.imageRepository.find({
    //   where: { user: { id: currentUser.id } }, // Better to query by ID
    //   relations: ['user'], // Add this to load the user relation
    //   order: { uploadDate: 'DESC' },
    // });

    // With pagination

    const images = await this.imageRepository.findAndCount({
      where: { user: { id: currentUser.id } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    const [items, total] = images;

    const serializerImage = items.map((item) => {
      return plainToClass(ImageResponseDto, item, {
        excludeExtraneousValues: true,
      });
    });

    return {
      items: serializerImage,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async softDelete(id: number, user: User): Promise<void> {
    // Soft delete all images
    const image = await this.imageRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    if (image && !image.isActive) {
      throw new NotFoundException('Image is deleted');
    }

    image.isActive = false;
    image.updatedAt = new Date();

    await this.imageRepository.save(image);
  }

  async restore(id: number, user: User): Promise<Image> {
    // Restore all images
    const image = await this.imageRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    image.isActive = true;
    image.updatedAt = new Date();

    return await this.imageRepository.save(image);
  }
}
