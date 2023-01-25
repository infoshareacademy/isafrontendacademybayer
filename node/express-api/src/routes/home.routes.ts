import { Express } from 'express';

export function homeRoutes(app: Express) {

  app.get('/', function(req, res) {
    console.log('MAIN PAGE')
    res.send('hello from main page <script>console.log("HELLO from javascript log")</script>')
  })
  
}