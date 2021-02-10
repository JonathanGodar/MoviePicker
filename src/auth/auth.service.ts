import { Injectable } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
   constructor(
       private readonly userService: UserService,
       private readonly configService: ConfigService
   ){}

   static readonly BEARER_PREFIX = 'Bearer ';
   async signToken(user: User): Promise<string>{
       return AuthService.BEARER_PREFIX + jwt.sign(
           {
             username: user.username
           }, 
            this.configService.get('SECRET')) 
   }

   //TODO Hash passwords
   async validateUser(username: string, password: string){
    const user = await this.userService.findOne({username});
    return (user && user.password == password) ? user : null; 
   }
  
   async registerUser(username: string, password: string){
       return this.userService.createUser(username, password);
   }
   
   async validateToken(token: string): Promise<User | undefined>{
        try{
            let decoded = jwt.verify(token.split(AuthService.BEARER_PREFIX, 2)[1], this.configService.get('SECRET'));
            return this.userService.findOne({username: decoded['username']});
        }catch{
            console.log("Threw error!");       
            return undefined;
        }
}
}
