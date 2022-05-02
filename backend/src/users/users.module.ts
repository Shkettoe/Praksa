import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserAuthInterceptor } from './interceptors/auth.interceptor';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/permission.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
require('dotenv').config()

@Module({
  imports: [User, Role, Permission, JwtModule.register({
    secret: process.env.JWTSECRET,
  }), TypeOrmModule.forFeature([User, Role, Permission])],
  controllers: [UsersController],
  providers: [UsersService, RolesService, PermissionsService, AuthService, LocalStrategy, JwtStrategy,
    { provide: APP_INTERCEPTOR, useClass: UserAuthInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
  exports: [AuthService, UsersService]
})
export class UsersModule { }
