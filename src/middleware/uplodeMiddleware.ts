import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express-serve-static-core';

export default (postedFile: string) => {
  const fileStorage = multer.diskStorage({
    destination: (req : Request, file , cb) => {
      cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });

  const fileFilter = (req : Request, file : Express.Multer.File , cb : FileFilterCallback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  return multer({ storage: fileStorage, fileFilter: fileFilter }).single(postedFile)

}