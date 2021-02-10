import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserDecorator } from "src/auth/decorators/user.decorator";
import { LoginGuard } from "src/auth/guards/login.guard";
import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { FieldResolver } from "type-graphql";
import { Watch } from "typescript";
import { QueryMoviesOfWatchGroupInput } from "./dto/query-movies-of-watch-group.input";
import { WatchGroup } from "./entities/watch-group.entity";
import { WatchGroupService } from "./watch-group.service";


@Resolver(of => WatchGroup)
export class WatchGroupResolver {

    constructor(private readonly watchGroupService: WatchGroupService) { }

    @ResolveField(returns => [User])
    async users(@Parent() parent: WatchGroup) {
        return this.watchGroupService.findUsersOfWatchGroup(parent);
    }

    @ResolveField(returns => [Movie])
    async movies(@Parent() parent: WatchGroup, @Args('input', { nullable: true }) input: QueryMoviesOfWatchGroupInput) {
        return this.watchGroupService.findMoviesOfWatchGroup(parent, input);
    }

    @Query(returns => [WatchGroup])
    async watchGroups(): Promise<WatchGroup[]> {
        return this.watchGroupService.findAll();
    }


    @UseGuards(LoginGuard)
    @Query(returns=> [WatchGroup])
    async myWatchGroups(@UserDecorator() user): Promise<WatchGroup[]> {
        return this.watchGroupService.findAll({containsUser: user.id});
    }

    @Mutation(returns => WatchGroup)
    async createWatchGroup() {
        return this.watchGroupService.createWatchGroup()
    }

    @Mutation(returns => WatchGroup)
    async addUserToWatchGroup(@Args('watchGroupId') watchGroupId: number, @Args('userId') userId: number) {
        return this.watchGroupService.addUserToWatchGroup(watchGroupId, userId)
    }

    @Mutation(() => Boolean, { nullable: true })
    async addMovieToWatchGroup(@Args('watchGroupId') watchGroupId: number, @Args('userId') movieId: number) {
        this.watchGroupService.addMovieToWatchGroup(watchGroupId, movieId)
    }

    @ResolveField(() => Movie)
    async electedMovie(@Parent() parent: WatchGroup) {
        return this.watchGroupService.electMovie({ watchGroup: parent });
    }

}