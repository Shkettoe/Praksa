import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from 'src/permissions/permission.entity';

@Module({
  imports: [Role, Permission, TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RolesController],
  providers: [RolesService, PermissionsService],
  exports: [RolesService, Role]
})
export class RolesModule {}
