// src/file-upload/file-upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new HttpException('No files provided', HttpStatus.BAD_REQUEST);
    }

    try {
      // Process the files and get the structured data
      const structuredData =
        await this.fileUploadService.processAndTransformFiles(files);
      return structuredData; // This will be your JSON structure to send back to the frontend
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
