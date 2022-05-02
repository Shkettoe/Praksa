import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email'
        })
    }

    async validate(username: string, password: string){
        const login: LoginDto = {email: username, password: password}
        try{
            const user = this.authService.login(login)
            return user
        } catch(err){
            throw new UnauthorizedException('unauthorised', err)
        }
    }
}