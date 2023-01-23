import { validate } from 'class-validator';
import { Express } from 'express';
import { dataSource } from '../db/data-source';
import { User } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';

const userRepository = dataSource.getRepository(User);

export function authRoutes(app: Express) {

  app.post('/auth/register', async (req, res) => {

    // validate the from data
    const user = new User(req.body);

    const errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // check if user already exits
    const existingUser = await userRepository.findOneBy({email: user.email});

    if(existingUser) {
      return res.status(400).json({message: 'Email already taken'})
    }

    // encode/hash password
    user.password = await bcrypt.hash(user.password, 10)
    
    // create new user

    // return status 200
    res.json(user);
  });
}