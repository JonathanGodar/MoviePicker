import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Field()
    @Column({unique: true})
    @Index()
    username: string;

    @Column()
    password: string
}