// src/modules/images/images.controller.ts
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dtos/upload-image.dto';
import { multerConfig } from '@/common/config/multer.config';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Auth } from '@/common/decorators/auth.decorator';

@ApiTags('images')
@Controller('images')
// @ApiBearerAuth()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // Ensure only authenticated users can access this route
  @Auth()
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
  // @UseGuards(JwtAuthGuard)
  @Auth()
  async findAll(@GetUser() user: User, @Query('page') page: number) {
    return this.imagesService.getAll(user);
  }
}
