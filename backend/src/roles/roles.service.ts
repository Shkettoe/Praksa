import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/permission.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>, private permService: PermissionsService){}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepo.create(createRoleDto)
    return this.roleRepo.save(role)
  }

  findAll() {
    return this.roleRepo.find({relations: ['permissions']})
  }

  async findOne(id: number) {
    try{
      return await this.roleRepo.findOneOrFail(id, {relations: ['permissions']})
    } catch(err){
      throw new NotFoundException('role not found', err)
    }
  }

  async update(rid: number, updateRoleDto: UpdateRoleDto) {
    var role = await this.findOne(rid)
    try{
      for (const key in role) {
        if(updateRoleDto[key]){
          console.log(key)
          role[key] = updateRoleDto[key]
        }
      }      
      return await this.roleRepo.save(role)
    }catch(err){
      throw new NotFoundException('role nto found', err)
    }
  }

  async remove(id: number) {
    try{
      const role = await this.findOne(id)
      return this.roleRepo.remove(role)
    }catch(err){
      throw new NotFoundException('roele note fourn', err)
    }
  }
}
