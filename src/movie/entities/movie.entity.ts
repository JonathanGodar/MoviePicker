import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { WatchGroupToMovie } from 'src/watch-group/entities/watch-group-to-movie.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from 'typeorm';

@ObjectType()
@Entity()
export class Movie {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column({unique: true})
  @Index()
  tmdbId: number;

  @Field(() => String)
  @Column({unique: true})
  title: string;

  @Field(() => Int)
  @Column()
  runTime: number;

  @OneToMany(type => WatchGroupToMovie, v => v.movie)
  watchGroupToMovie: WatchGroupToMovie[];
}
