import { Express } from 'express';
import { auth } from '../common/auth.middleware';
import { validateMiddleware } from '../common/validate.middleware';
import { dataSource } from '../db/data-source';
import { Burger } from '../db/entities/burger.entity';

const burgerRepository = dataSource.getRepository(Burger);

export function burgersRoutes(app: Express) {

  app.post(
    '/burgers', 
    auth(), 
    validateMiddleware(Burger), 
    async function(req, res) {

      const burger = req.body;

      burger.user = req.user;
    
      await burgerRepository.save(burger);
    
      res.json(burger);
    }
  );
  
  app.get('/burgers', auth(), async function(req, res) {

    const burgers = await burgerRepository.find({
      order: {id: 'ASC'}
    });

    res.json(burgers);
  })

  app.put('/burgers/:id', 
    auth(),
    validateMiddleware(Burger),
    async function(req, res) {
      
      const id = parseInt(req.params.id, 10);
      const data = req.body;
      const user = req.user;

      const burger = await burgerRepository.findOneBy({ id });

      if(burger.user.id !== user.id) {
        return res.status(403).json({message: 'You do not own this burger'})
      }

      if(!burger) {
        return res.status(404).json({ error: `Burger ${id} not found`})
      }

      const updated = await burgerRepository.update(id, data);

      res.json(updated);
    }
  )

  app.delete('/burgers/:id', auth(), async function(req, res) {
    
    const id = parseInt(req.params.id, 10);

    const burger = await burgerRepository.findOneBy({ id });

    if(!burger) {
      return res.status(404).json({ error: `Burger ${id} not found`})
    }

    if(burger.user.id !== req.user.id) {
      return res.status(403).json({message: 'You do not own this burger'})
    }

    const updated = await burgerRepository.delete(id);

    res.json(updated);
  })
  
}