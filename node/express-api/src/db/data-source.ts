import { DataSource } from 'typeorm';
import { Burger } from './entities/burger.entity';
import 'dotenv/config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  entities: [Burger],
  migrations: ["src/db/migrations/*.ts"],
});

dataSource.initialize()
  .then(() => console.log('DB CONNECTION SUCCESS'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))