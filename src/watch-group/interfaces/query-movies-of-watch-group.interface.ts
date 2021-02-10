import { IMovieQuery } from "src/movie/interfaces/movie-query.interface";

export interface IQueryMoviesOfWatchGroup extends IMovieQuery {
    watched?: boolean
}