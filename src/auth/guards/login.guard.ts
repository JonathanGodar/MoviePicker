import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import  * as jwt from 'jsonwebtoken'
import { GqlExecutionContext } from "@nestjs/graphql";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private readonly authService: AuthService){}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        let gqlCtx = GqlExecutionContext.create(context).getContext();
        if(gqlCtx.headers['access-token']){
            let user = await this.authService.validateToken(gqlCtx.headers['access-token']);
            if(!user)
                return false;
            gqlCtx.user = user;
            return true;
        }

        return false; 
    }
}