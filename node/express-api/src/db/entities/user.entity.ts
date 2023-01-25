import { MinLength, IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  name: string;
  
  @Column()
  @IsEmail()
  email: string;
  
  @Column()
  @MinLength(4)
  password: string;

  constructor(data?: Omit<User, 'id'>) {
    Object.assign(this, data);
  }
}