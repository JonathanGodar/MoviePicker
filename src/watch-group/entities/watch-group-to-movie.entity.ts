import { Movie } from "src/movie/entities/movie.entity";
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { WatchGroup } from "./watch-group.entity";

@Entity()
export class WatchGroupToMovie extends BaseEntity {
    @PrimaryColumn()
    public watchGroupId!: number;

    @PrimaryColumn()
    public movieId!: number;

    @Column({ nullable: false, default: false })
    public watched: boolean;

    @ManyToOne(type => WatchGroup, wg => wg.watchGroupToMovie, { primary: true })
    public watchGroup: WatchGroup;

    @ManyToOne(type => Movie, movie => movie.watchGroupToMovie, { primary: true })
    public movie: Movie;
}