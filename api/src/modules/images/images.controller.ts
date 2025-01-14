// src/modules/images/images.controller.ts
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dtos/uploadImage.dto';
import { multerConfig } from '@/common/config/multer.config';
import { JwtAuthGuard } from '@/common/guards/jwtAuth.guard';
import { GetUser } from '@/common/decorators/getUser.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('images')
@Controller('images')
@ApiBearerAuth()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Ensure only authenticated users can access this route
  @UseInterceptors(FileInterceptor('image', multerConfig()))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageDto: UploadImageDto,
    @GetUser() user: User,
  ) {
    return this.imagesService.create(file, uploadImageDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@GetUser() user: User) {
    return this.imagesService.getAll(user);
  }
}
