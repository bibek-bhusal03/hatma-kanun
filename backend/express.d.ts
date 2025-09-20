import { Multer } from "multer";
import { Request } from "express";

interface DecodedAccessToken {
  email: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      decodedAccessToken?: DecodedAccessToken;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
      file?: Multer.File;
    }
  }
}
