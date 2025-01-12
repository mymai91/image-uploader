import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { UploadImageDto } from './dtos/upload-image.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESS_OPTIONS } from '@/common/config/data.config';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(
    file: Express.Multer.File,
    uploadImageDto: UploadImageDto,
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
      }) // Resize the image to a maximum width of 800px
      .jpeg({ quality: COMPRESS_OPTIONS.quality }) // Compress the image with 80% quality
      .toFile(compressedFilePath);

    // Delete the original file if you don't need it
    fs.unlinkSync(file.path);

    // Save the compressed file details in the database
    const image = this.imageRepository.create({
      filename: compressedFilename,
      path: compressedFilePath,
      description: uploadImageDto.description,
    });

    return this.imageRepository.save(image);
  }
}
