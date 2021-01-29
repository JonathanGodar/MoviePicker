import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { TmdbModule } from 'src/tmdb/tmdb.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TmdbModule],
  providers: [MovieResolver, MovieService]
})
export class MovieModule {}
