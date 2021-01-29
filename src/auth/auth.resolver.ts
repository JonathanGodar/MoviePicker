import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Resolver(of => User)
export class AuthResolver {

    constructor(private readonly authService: AuthService){}

    @Query(returns => User, {nullable: true})
    async login(@Args('username') username: string, @Args('password') password: string): Promise<User | undefined>{
        return this.authService.validateUser(username, password); 
    }

    @Mutation(returns => User, {nullable: true})
    async register(@Args('username') username: string, @Args('password') password: string){
        return this.authService.registerUser(username, password);
    }
}
