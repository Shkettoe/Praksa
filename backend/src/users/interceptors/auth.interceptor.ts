import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class UserAuthInterceptor implements NestInterceptor{
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler){
        const request = context.switchToHttp().getRequest()
        const jwt = await request.cookies.jwt
        try{
            const data = await this.jwtService.verifyAsync(jwt)
            const userId = data.sub
            const user = await this.usersService.findOne(userId)
            request.userCurrent = user
        } catch(err){
            
        }
        return next.handle()
    }
}