import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './users/auth.service';
import { UserAuth } from './users/decorators/auth.decorator';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(@UserAuth() user: User) {
    return user
  }

  @Get('jwt')
  @UseGuards(AuthGuard('jwt'))
  getJwt(@Req() req: Request){
    return req.cookies.jwt
  }
}
