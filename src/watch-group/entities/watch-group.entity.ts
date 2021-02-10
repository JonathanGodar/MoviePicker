import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WatchGroupToMovie } from "./watch-group-to-movie.entity";
import { WatchGroupToUser } from "./watch-group-to-user.entity";

@ObjectType()
@Entity()
export class WatchGroup extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;


    @Field(() => Date)
    @Column({ nullable: true })
    lastMovieWasElected: Date;

    @Field()
    @Column({ nullable: true })
    lastElectedMovieId: number;

    @ManyToOne(type => WatchGroupToMovie, { nullable: true, lazy: true })
    lastElectedMovie?: Promise<WatchGroupToMovie>;

    @ManyToMany(type => User)
    @JoinTable()
    users?: User[]

    @OneToMany(type => WatchGroupToMovie, m => m.watchGroup)
    watchGroupToMovie?: WatchGroupToMovie[];

    @OneToMany(type => WatchGroupToUser, wgtu => wgtu.watchGroup)
    watchGroupToUser?: WatchGroupToUser[];

}