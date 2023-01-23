import { IsNotEmpty, IsNumber, validate } from 'class-validator';
import 'dotenv/config';

export class ConfigServie {

  @IsNotEmpty()
  DB_HOST = process.env.DB_HOST;

  @IsNumber()
  DB_PORT = parseInt(process.env.DB_PORT, 10);

  @IsNotEmpty()
  DB_DATABASE = process.env.DB_DATABASE;
  
  @IsNotEmpty()
  DB_USERNAME = process.env.DB_USERNAME;

  @IsNotEmpty()
  DB_PASSWORD = process.env.DB_PASSWORD;

  @IsNotEmpty()
  JWT_SECRET = process.env.JWT_SECRET;
}

export const config = new ConfigServie();

validate(config).then(errors => {
  if(errors.length) {
    // TODO format nice error message
    console.dir(errors);
    return Promise.reject('ConfigService Validation ERROR')
  }

}); 
