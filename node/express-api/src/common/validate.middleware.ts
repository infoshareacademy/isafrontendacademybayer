import { validate } from 'class-validator';

// validate req.body with the entity & transform 

export function validateMiddleware(Entity) {
  return async (req, res, next) => {
    const entity = new Entity();

    Object.assign(entity, req.body);

    const errors = await validate(entity);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    req.body = entity;

    next();
  }
}