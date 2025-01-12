import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { UploadImageDto } from './dtos/upload-image.dto';

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
    const image = this.imageRepository.create({
      filename: file.filename,
      path: file.path,
      description: uploadImageDto.description,
    });

    return this.imageRepository.save(image);
  }
}
