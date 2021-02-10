import { Field, InputType } from "@nestjs/graphql";
import { Arg } from "type-graphql";
import { IMovieQuery } from "../interfaces/movie-query.interface";

@InputType()
export class MovieQueryInput implements IMovieQuery {
    @Field({ nullable: true })
    title?: string;
}