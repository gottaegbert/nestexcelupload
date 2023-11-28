// src/file-upload/file-upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const transformedData =
      await this.fileUploadService.processAndTransformFiles(files);
    return transformedData; // Send the transformed data as the response
  }
}
