import { Int } from "@nestjs/graphql";
import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { WatchGroup } from "./watch-group.entity";

@Entity()
export class WatchGroupToUser extends BaseEntity {
    @PrimaryColumn()
    watchGroupId: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(type => WatchGroup, wg => wg.watchGroupToUser)
    watchGroup?: WatchGroup;

    @ManyToOne(type => User)
    user?: User;
}