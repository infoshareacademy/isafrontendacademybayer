import { Request, Response, NextFunction } from "express";
import { User } from "../db/entities/user.entity";
import * as jsonwebtoken from 'jsonwebtoken';
import { dataSource } from '../db/data-source';
import { config } from "./config";

export interface AuthRequest extends Request {
  user?: User;
}

const userRepository = dataSource.getRepository(User);

export function auth() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {

    // extract jwt token from headers
    const token = req.headers.authorization;

    // if no token, return 401 unauthorized response
    if(!token) {
      return res.status(401).end();
    }

    // decode & validate the token
    let payload;
    try {
      payload = jsonwebtoken.verify(token, config.JWT_SECRET);
    } catch (error) {
      return res.status(401).end();
    }

    // fetch user from database
    const user = await userRepository.findOneBy({id: payload.userId});

    // if user not found, return 401 unauthorized response
    if(!user) {
      return res.status(401).end();
    }

    // assign user to req.user property
    req.user = user;

    next();
  }
}