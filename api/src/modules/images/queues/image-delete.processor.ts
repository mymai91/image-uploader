import { Processor, Process } from '@nestjs/bull';
import { ImagesService } from '../images.service';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Processor('image-delete')
export class ImageDeleteProcessor {
  constructor(private readonly imagesService: ImagesService) {}

  @Process('delete')
  async handleDelete(job: Job<{ imageId: number }>) {
    const { imageId } = job.data;

    const image = await this.imagesService.findById(imageId);

    if (image) {
      try {
        // Delete physical file
        await fs.unlink(path.join(process.cwd(), image.path));
        // Delete from database
        await this.imagesService.delete(image);
      } catch (error) {
        Logger.error(`Failed to delete image with ID: ${imageId}`, error);
      }
    }
  }
}
