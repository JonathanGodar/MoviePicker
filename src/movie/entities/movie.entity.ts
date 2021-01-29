import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, } from 'typeorm';

@ObjectType()
@Entity()
export class Movie {
  @Field(() => ID)
  @Column({unique: true})
  @Index()
  @PrimaryColumn()
  tmdbId: number;

  @Field(() => String)
  @Column({unique: true})
  title: string;

  @Field(() => Int)
  @Column()
  runTime: number;
}
