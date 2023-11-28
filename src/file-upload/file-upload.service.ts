// src/file-upload/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class FileUploadService {
  async processAndTransformFiles(
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    // process and transform the files goes here
    const results = files.map((file) => {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Transform jsonData to the desired format
      const structuredData = this.transformData(jsonData);
      return structuredData;
    });
    const finaldata = await this.transformData(results);
    return finaldata;
  }

  private transformData(jsonData: any[]): any {
    return {
      data: jsonData.map((item) => ({
        title: item['主标题'],
        subTitle: item['副标题'],
        list: item['列表标题']
          .split('\\r\\n')
          .filter((title) => title)
          .map((title, index) => ({
            title: title,
            content: item['列表内容'].split('\\r\\n')[index].trim(),
          })),
      })),
    };
  }
}
