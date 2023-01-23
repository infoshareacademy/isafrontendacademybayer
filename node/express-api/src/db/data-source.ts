import { DataSource } from 'typeorm';
import { config } from '../common/config';
import { Burger } from './entities/burger.entity';

import { User } from './entities/user.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  username: config.DB_USERNAME, 
  password: config.DB_PASSWORD,
  entities: [Burger, User],
  migrations: ["src/db/migrations/*.ts"],
});

dataSource.initialize()
  .then(() => console.log('DB CONNECTION SUCCESS'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))