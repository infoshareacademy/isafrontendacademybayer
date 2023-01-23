import { validate } from 'class-validator';
import { Express } from 'express';
import { User } from '../db/entities/user.entity';

export function authRoutes(app: Express) {

  app.post('/auth/register', async (req, res) => {

    // validate the from data
    const user = new User(req.body);

    const errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // check if user already exits
    

    // encode/hash password

    // create new user

    // return status 200
    res.json(user);
  });
}