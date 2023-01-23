import { Express } from 'express';
import { dataSource } from '../db/data-source';
import { User } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { LoginDto } from './auth.dto';
import { validateMiddleware } from '../common/validate.middleware';
import { auth, AuthRequest } from '../common/auth.middleware';
import { config } from '../common/config';

const userRepository = dataSource.getRepository(User);

export function authRoutes(app: Express) {

  app.post(
    '/auth/register', 
    validateMiddleware(User), 
    async (req, res) => {

      // get validated 
      const user: User = req.body;

      // check if user already exits
      const existingUser = await userRepository.findOneBy({email: user.email});

      if(existingUser) {
        return res.status(400).json({message: 'Email already taken'})
      }

      // encode/hash password
      user.password = await bcrypt.hash(user.password, 10)

      // create new user
      await userRepository.save(user);

      // return status 200
      res.json(user);
    }
  );

  app.post(
    '/auth/login', 
    // validate the form data
    validateMiddleware(LoginDto), 
    async (req, res) => {

      const data: LoginDto = req.body;

      // find the user entity in database
      const user = await userRepository.findOneBy({email: data.email})

      // throw if not found
      if(!user) {
        return res.status(400).json({message: 'Credentials invalid'})
      }

      // validate the password
      const isValid = await bcrypt.compare(data.password, user.password);

      if(!isValid) {
        return res.status(400).json({message: 'Credentials invalid'})
      }

      // create jwt access token
      const payload = {
        userId: user.id,
      };

      const token = jsonwebtoken.sign(payload, config.JWT_SECRET);

      // return user & token to the frontend
      res.json({
        token,
        user,
      })
    }
  );

  app.get(
    '/auth/me', 
    auth(),
    async (req: AuthRequest, res) => {
      
      res.json(req.user);
    }
  );
}