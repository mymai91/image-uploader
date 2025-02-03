// src/modules/images/images.service.ts
import { COMPRESS_OPTIONS } from '@/common/config/data.config';
import { UserUtil } from '@/common/utils/user.utils';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UploadImageDto } from './dtos/upload-image.dto';
import { Image } from './entities/images.entity';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { plainToClass } from 'class-transformer';
import { ImageResponseDto } from './dtos/image-response.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { FindAllImageDto } from './dtos/find-all-image.dto';

@Injectable()
export class ImagesService {
  private readonly baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.DOMAIN_PROD
      : process.env.DOMAIN_LOCAL;

  private readonly delayTime = 60 * 60 * 1000; // 1 hour
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    private userUtils: UserUtil,

    @InjectQueue('image-delete') private imageDeleteQueue: Queue,
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
        path: `${this.baseUrl}/${compressedFilePath}`,
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
    findAllImageDto: FindAllImageDto,
  ): Promise<PaginationResponseDto<ImageResponseDto>> {
    const currentUser = await this.userUtils.getCurrentUser(user.email);

    const { limit = 10, page = 1 } = findAllImageDto;
    const skip = (page - 1) * limit;

    // Without pagination
    // const images = await this.imageRepository.find({
    //   where: { user: { id: currentUser.id } }, // Better to query by ID
    //   relations: ['user'], // Add this to load the user relation
    //   order: { uploadDate: 'DESC' },
    // });

    // With pagination

    const images = await this.imageRepository.findAndCount({
      where: {
        user: { id: currentUser.id },
        isActive: findAllImageDto.isActive,
      },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    const [items, total] = images;

    const serializerImage = items.map((item) => {
      const image = { ...item, path: `${this.baseUrl}/${item.path}` };
      return plainToClass(ImageResponseDto, image, {
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

    // Add to queue without await since it's a background task
    try {
      //  we don't need to await the queue addition -  we don't want to block the API response
      this.imageDeleteQueue.add(
        'delete',
        { imageId: image.id },
        { delay: this.delayTime }, // 1 hour
      );
    } catch (error) {
      Logger.error('Failed to add delete job to queue:', error);
    }
  }

  async restore(id: number, user: User): Promise<Image> {
    // Restore all images
    const image = await this.imageRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    try {
      // Get all jobs in the queue
      const jobs = await this.imageDeleteQueue.getJobs(['delayed']);

      // Find and remove the job for this image
      const jobToRemove = jobs.find((job) => job.data.imageId === image.id);

      if (jobToRemove) {
        await jobToRemove.remove();
      }

      // Restore the image
      image.isActive = true;
      image.deletedAt = null;
      image.updatedAt = new Date();

      const restoreImage = await this.imageRepository.save(image);
      restoreImage.path = `${this.baseUrl}/${restoreImage.path}`;

      return restoreImage;
    } catch (error) {
      Logger.error('Failed to restore image:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Image> {
    return await this.imageRepository.findOneBy({ id });
  }

  async delete(image: Image): Promise<void> {
    await this.imageRepository.remove(image);
  }
}
