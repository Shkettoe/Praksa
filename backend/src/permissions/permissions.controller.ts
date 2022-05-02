import { Body, Controller, Get } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { HasPermission } from './decorators/permission.decorator';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  get(){
    return this.permissionsService.get() 
  }

  // @Get('name')
  // getOne(@Body() createRoleDto: CreateRoleDto){
  //   return this.permissionsService.getSome(createRoleDto)
  // }
}
