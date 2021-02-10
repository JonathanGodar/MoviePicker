import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Ctx } from 'type-graphql';
import { LoginGuard } from './guards/login.guard';
import { User } from 'src/user/entities/user.entity';
import { UserDecorator } from './decorators/user.decorator';

@Resolver(of => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Query(returns => String, {nullable: true})
    async login(@Args('username') username: string, @Args('password') password: string): Promise<string | undefined>{
        let user = await this.authService.validateUser(username, password); 

        if(user)
            return this.authService.signToken(user);
    }

    @UseGuards(LoginGuard)
    @Query(() => User)
    async tryThis(@UserDecorator() user: User){
        return user; 
    }

    @Mutation(returns => User, {nullable: true})
    async register(@Args('username') username: string, @Args('password') password: string){
        return this.authService.registerUser(username, password);
    }
}
