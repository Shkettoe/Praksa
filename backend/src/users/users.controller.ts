
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { InauthGuard } from './guards/inauth.guard';
import { GetUserDto } from './dto/get-users.dto';
import { HasPermission } from 'src/permissions/decorators/permission.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

  @Get()
  @HasPermission('view_users')
  findAll(@Query() query?: Partial<GetUserDto>) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @HasPermission('view_users')
  findOne(@Param('id') id: User['id']) {
    return this.usersService.findOne(id);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'), InauthGuard)
  async login(@Request() req, @Res({ passthrough: true }) res: Response){
    const jwt = await this.authService.token(req.user)
    res.cookie('jwt', jwt, {httpOnly: true})
    return req.cookies['jwt']
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res({passthrough: true}) res: Response){
    res.clearCookie('jwt', {httpOnly: true})
  }

  @Post('register')
  @UseGuards(InauthGuard)
  async create(@Body() createUserDto: CreateUserDto, @Res({passthrough:true})res: Response) {
    const user = await this.authService.register(createUserDto);
    const jwt = await this.authService.token(user)
    res.cookie('jwt', jwt, {httpOnly:true})
    return user
  }

  @Patch(':id')
  update(@Param('id') id: User['id'], @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: User['id']) {
    return this.usersService.remove(id);
  }
}
