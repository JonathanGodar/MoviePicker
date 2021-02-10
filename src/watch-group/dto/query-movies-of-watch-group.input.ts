import { Field, InputType } from "@nestjs/graphql";
import { MovieQueryInput } from "src/movie/dto/find-movie.input";
import { IQueryMoviesOfWatchGroup } from "../interfaces/query-movies-of-watch-group.interface";

@InputType()
export class QueryMoviesOfWatchGroupInput extends MovieQueryInput implements IQueryMoviesOfWatchGroup {
    @Field({ nullable: true })
    watched?: boolean;
}