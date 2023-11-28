// src/file-upload/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class FileUploadService {
  async processAndTransformFiles(
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    // Your logic to process and transform the files goes here
    const results = files.map((file) => {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Transform jsonData into your desired structure
      const structuredData = this.transformData(jsonData);
      return structuredData;
    });

    // Assuming all files are structured the same way and you want to combine them
    const combinedData = [].concat(...results);
    return combinedData;
  }

  private transformData(jsonData: any[]): any {
    // Implement the transformation logic to match the structure needed
    // This would depend on the format of your Excel files and the desired JSON structure
    return jsonData; // Placeholder, implement your actual transformation logic
  }
}
