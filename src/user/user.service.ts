import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async findAll(){
        return this.userRepository.find();
    }

    async findOne(options: {
        username?: string,
        id?: number
    }){
        return this.userRepository.findOne({where: options})
    }

    async createUser(username: string, password: string){
        return this.userRepository.create({username, password}).save();
    }
}
