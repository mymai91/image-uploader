// src/modules/images/images.controller.ts
import { multerConfig } from '@/common/config/multer.config';
import { Auth } from '@/common/decorators/auth.decorator';
import { GetUser } from '@/common/decorators/get-user.decorator';
import {
  Body,
  ClassSerializerInterceptor,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UploadImageDto } from './dtos/upload-image.dto';
import { ImagesService } from './images.service';
import { ImageResponseDto } from './dtos/image-response.dto';
import { FindAllImageDto } from './dtos/find-all-image.dto';

@ApiTags('images')
@Controller('images')
// @ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
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
  @SerializeOptions({ type: ImageResponseDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageDto: UploadImageDto,
    @GetUser() user: User,
  ) {
    return this.imagesService.create(file, uploadImageDto, user);
  }

  @Get()
  @Auth()
  // @SerializeOptions({ type: ImageResponseDto })
  async findAll(
    @GetUser() user: User,
    @Query() findAllImageDto: FindAllImageDto,
  ) {
    return this.imagesService.getAll(user, findAllImageDto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@GetUser() user: User, @Param('id') id: number) {
    await this.imagesService.softDelete(id, user);
  }

  @Put(':id/restore')
  @Auth()
  @SerializeOptions({ type: ImageResponseDto })
  async restore(@GetUser() user: User, @Param('id') id: number) {
    return this.imagesService.restore(id, user);
  }
}
