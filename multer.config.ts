// multer.config.ts
import { MulterModuleOptions } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    },
  }),
};
