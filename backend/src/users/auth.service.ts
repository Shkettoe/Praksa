import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}

    async register(createUserDto: CreateUserDto){
        const emailTaken = await this.usersService.findAll({email: createUserDto.email})
        if(emailTaken.length) throw new BadRequestException('email is taken')
        const usernameTaken = await this.usersService.findAll({username: createUserDto.username})
        if(usernameTaken.length) throw new BadRequestException('username is taken')

        const salt = await bcrypt.genSalt(13)
        createUserDto.password = `${salt}|${await bcrypt.hash(createUserDto.password, salt)}`

        return await this.usersService.create(createUserDto)
    }

    async login(login: LoginDto){
        const [user] = await this.usersService.findAll(login)
        if(!user) throw new NotFoundException('user with that email not found')

        const [salt, hash] = user.password.split('|')
        const pass = await bcrypt.hashSync(login.password, salt)
        if(pass !== hash) throw new UnauthorizedException('incorrect password')

        return user
    }

    async token(user: User){
        try{
            return await this.jwtService.sign({sub: user.id})
        } catch(err){
            throw new BadRequestException()
        }
    }

    async validateToken(token: string){
        try{
            const data = await this.jwtService.verifyAsync(token)
            return data
        }catch(err){
            throw new UnauthorizedException('token expired', err)
        }
    }
}
