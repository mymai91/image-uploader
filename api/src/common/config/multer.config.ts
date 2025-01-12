import { diskStorage } from 'multer';
import { extname } from 'path';
import { MAX_FILE_SIZE, UPLOAD_ACCEPTED_FILE_TYPES } from './data.config';

export const multerConfig = () => {
  return {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!UPLOAD_ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  };
};
