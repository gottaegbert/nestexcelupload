import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Make sure this folder exists or is created dynamically
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.match(
        /\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel)$/,
      )
    ) {
      // Accept only specific mime types for xlsx and xls
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type, only XLSX and XLS files are allowed!'),
        false,
      );
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
};
