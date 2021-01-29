import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Min,  } from 'class-validator';
import { Movie } from '../entities/movie.entity';

@InputType()
export class CreateMovieInput{
  @Field(() => ID)
  tmdbId: number;
}
 