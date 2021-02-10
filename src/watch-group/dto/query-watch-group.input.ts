import { Field, ID, InputType } from "@nestjs/graphql";
import { IQueryWatchGroup } from "../interfaces/query-watch-group.interface";


@InputType()
export class QueryWatchGroupInput implements IQueryWatchGroup{
    @Field(() => ID, {nullable: true})
    containsUser?: number;

}