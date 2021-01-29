import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './entities/movie.entity';
import { IMovieQuery } from './interfaces/movie-query.interface';

@Injectable()
export class MovieService {

  constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>, private readonly tmdbService: TmdbService){}

  // async create(createMovieInput: CreateMovieInput) {
  //   return this.movieRepository.save(created); 
  // }

  async createFromTmdb(createMovieInput: CreateMovieInput){
    const movie = await this.tmdbService.getByMovieId(createMovieInput.tmdbId)
    return this.movieRepository.save(movie)
  }

  findAll(query?: IMovieQuery) {
    if(!query){
      return this.movieRepository.find(); 
    }

    let qb = this.movieRepository.createQueryBuilder('movie');
    
    if(query.title){
      qb.where('movie.title LIKE :title', {title: `%${query.title}%`})
    }

    return qb.getMany(); //this.movieRepository.find({where: {...query}});
  }

  async findOne(id: number): Promise<Movie | undefined> {
    return this.movieRepository.findOne({where: {id}});
  }
}
