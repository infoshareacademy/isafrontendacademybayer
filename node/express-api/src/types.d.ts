import 'express';
import 'express-serve-static-core';
import { User } from './db/entities/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
declare module 'express-serve-static-core' {
  export interface Request {
    user?: User;
  }
}