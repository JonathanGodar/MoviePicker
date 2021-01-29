import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { Url } from 'url';
import fetch from 'node-fetch'
import { Movie } from 'src/movie/entities/movie.entity';
import { CouldNotFindMovieError } from './exceptions/couldNotFindMovie.error';
import { plainToClass } from 'class-transformer';
import { MovieResponse } from './interfaces/movie';
import { NoDeprecatedCustomRule } from 'graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
    private API_KEY;
    private BASE_PARAMS;
    private readonly BASE_URL = new URL("https://api.themoviedb.org/3/");

    constructor(configService: ConfigService) {
        this.API_KEY = configService.get('TMDB_API_KEY');
        this.BASE_PARAMS = {
            "api_key": this.API_KEY
        }
    }

    buildURL(subUrl: string, params: Object = {}): URL{
        const combined = {...params, ...this.BASE_PARAMS};        
        const url = new URL(subUrl, this.BASE_URL);
        Object.keys(combined).forEach(key => url.searchParams.append(key, combined[key]))
        return url;
    }

    private async getMovieRequestById(id: number){
        return fetch(this.buildURL(`movie/${id}`).toString())
    }

    async getByMovieId(id: number): Promise<MovieResponse>{
        console.log("getting movie!");
        const request = await this.getMovieRequestById(id);
        if(request.status != HttpStatus.OK){
            throw new CouldNotFindMovieError();
        }

        return request.json().then((val) => {
            return {
                tmdbId: val.id,
                summary: val.overview,
                title: val.title,
                rating: val.vote_average,
                runTime: val.runtime,
            }
        })
    }
}
