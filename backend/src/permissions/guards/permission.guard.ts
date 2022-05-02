import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RolesService } from 'src/roles/roles.service';
import { AuthService } from 'src/users/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService, private usersService: UsersService, private roleService: RolesService){}
  
  async canActivate(context: ExecutionContext,){
    const access = this.reflector.get('permission', context.getHandler())
    if(!access) return true
    const request = context.switchToHttp().getRequest()
    try{
      const data = await this.authService.validateToken(request.cookies.jwt)
      const user = await this.usersService.findOne(data.sub)
      const role = await this.roleService.findOne(user.role.id)
      const permissions = role.permissions || []
      for (const permission of permissions) {
        if(permission.name === access) return true
      }
    }catch(err){
      console.log(err)
    }
    return false;
  }
}
