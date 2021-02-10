import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { watch } from 'fs';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { AdvancedConsoleLogger, Repository } from 'typeorm';
import { WatchGroupToMovie } from './entities/watch-group-to-movie.entity';
import { WatchGroupToUser } from './entities/watch-group-to-user.entity';
import { WatchGroup } from './entities/watch-group.entity';
import { IQueryMoviesOfWatchGroup } from './interfaces/query-movies-of-watch-group.interface';
import { IQueryWatchGroup } from './interfaces/query-watch-group.interface';

@Injectable()
export class WatchGroupService {
    private static readonly REELECTTIMESECONDS: number = 5;

    constructor(
        @InjectRepository(WatchGroup)
        private readonly watchGroupRepository: Repository<WatchGroup>,
        @InjectRepository(WatchGroupToMovie)
        private readonly watchGroupToMovieRepository: Repository<WatchGroupToMovie>,
        @InjectRepository(WatchGroupToUser)
        private readonly watchGroupToUserRepository: Repository<WatchGroupToUser>,
        private readonly userService: UserService,
        private readonly movieService: MovieService
    ) { }

    async findUsersOfWatchGroup(wg: WatchGroup) {
        return this.watchGroupToUserRepository.find({
            where:
            {
                watchGroupId: wg.id,
            },
            relations: ["user"]
        }).then(
            wgtu => wgtu.map(element => element.user)
        );
    }

    async findMoviesOfWatchGroup(wg: WatchGroup, query: IQueryMoviesOfWatchGroup = {}) {
        var qb = this.watchGroupToMovieRepository.createQueryBuilder("wgtm")
            .where("wgtm.watchGroup = :id", { id: wg.id })
            .leftJoinAndSelect("wgtm.movie", "movie").select("movie.id");

        const { watched = undefined, ...movieSpecific } = query;

        if (!(watched === undefined))
            qb = qb.andWhere("wgtm.watched = :watched", { watched })

        for (const key in movieSpecific) {
            qb.andWhere(
                `movie.${key} = :value`, {
                value: movieSpecific[key]
            }
            )
        }
        console.log((await qb.getMany()).map(wgtm => wgtm.movie));
        return (await qb.getMany()).map((wgtm) => wgtm.movie);
    }

    async addMovieToWatchGroup(watchGroupId: number, movieId: number) {
        this.watchGroupToMovieRepository.create({ movieId, watchGroupId }).save();
    }

    async findAll(query: IQueryWatchGroup = {}): Promise<WatchGroup[]> {
        
        if(query.containsUser !== undefined){
            console.log( await this.watchGroupToUserRepository.find({where: {userId: query.containsUser}, relations: ['watchGroup']}));
        }

        return this.watchGroupRepository.find();
        // return this.watchGroupRepository.find({where: {

        // }});
    }

    async createWatchGroup(): Promise<WatchGroup> {
        return new WatchGroup().save();
    }

    async electMovie({ watchGroup }: { watchGroup: WatchGroup }): Promise<Movie> {
        // @ts-ignore
        if ((new Date() - watchGroup.lastMovieWasElected) / 1000 > WatchGroupService.REELECTTIMESECONDS) {
            const found = await this.watchGroupToMovieRepository
                .createQueryBuilder('wgtm')
                .where('wgtm.watchGroupId = :id', { id: watchGroup.id })
                .andWhere('wgtm.watched = false') // Makes sure only non-watched movies are elected.
                .orderBy('RANDOM()')
                .leftJoinAndSelect('wgtm.movie', 'movie')
                .getOne();

            if (found) {
                found.watched = true;
                found.save()

                this.watchGroupRepository.findOne(found.watchGroupId).then((result) => {
                    result.lastElectedMovieId = found.movie.id;
                    result.lastMovieWasElected = new Date();
                    result.save();
                });

                return found.movie;
            }
        }

        // console.log(
        //     await this.watchGroupToMovieRepository.createQueryBuilder("wgtm").update().set({ watched: true }).where('wgtm.watchGroupId = :id', { id: watchGroup.id }).orderBy('RANDOM()').limit(1).execute()
        // )
        return this.movieService.findOne(watchGroup.lastElectedMovieId);
    }

    async addUserToWatchGroup(watchGroupId: number, userId: number) {
        this.watchGroupToUserRepository
            .create({
                watchGroupId,
                userId,
            })
            .save();
    }
}
