import { IsNotEmpty, IsNumberString, Min, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Burger {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredients: string

  @Column()
  @MinLength(3)
  name: string;

  @Column({type: 'numeric'})
  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @Column()
  url: string;

  @ManyToOne(type => User, {eager: true})
  user: User;
} 