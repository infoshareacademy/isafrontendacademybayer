import 'express';
import { User } from './db/entities/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}