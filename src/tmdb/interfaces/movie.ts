import { Movie } from "src/movie/entities/movie.entity";

export interface MovieResponse extends Partial<Movie>
{
    tmdbId: number;
    summary: string;
    title: string;
    rating: string;
}