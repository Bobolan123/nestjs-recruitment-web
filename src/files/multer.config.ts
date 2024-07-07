import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

// Importing fs with require to ensure compatibility
const fs = require('fs');

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => {
    return process.cwd();
  };

  ensureExist = (targetDir: string) => {
    fs.mkdir(
      targetDir,
      { recursive: true },
      (error: NodeJS.ErrnoException | null) => {
        if (!error) {
          console.log('Directory successfully created or it already exists');
          return;
        } else {
          console.log(error);
        }
      },
    );
  };

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const folder_type = req?.headers?.folder_type ?? 'default';
          const folder = path.join('public', 'images', folder_type); // Use path.join for consistent separators
          this.ensureExist(folder);
          cb(null, path.resolve(this.getRootPath(), folder));
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          const extName = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, extName);

          const newName = `${baseName}-${Date.now()}${extName}`;
          cb(null, newName);
        },
      }),
    };
  }
}
