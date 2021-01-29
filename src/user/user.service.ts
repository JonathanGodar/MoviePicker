import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async findOne(username:string){
        return this.userRepository.findOne({where: {username}})
    }

    async createUser(username: string, password: string){
        return this.userRepository.create({username, password}).save();
    }
}
