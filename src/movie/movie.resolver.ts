import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { MovieQueryInput } from './dto/find-movie.input';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => [Movie])
  movies(@Args('query', {nullable: true}) query: MovieQueryInput){
    return this.movieService.findAll(query);
  }

  @Mutation(() => Movie, {nullable: true})
  createMovie(@Args('input') input: CreateMovieInput ){
    return this.movieService.createFromTmdb(input);
  }
}
