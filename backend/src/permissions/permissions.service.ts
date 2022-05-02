import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permission) private permRepo: Repository<Permission>){}

    async get(){
        return await this.permRepo.find()
    }

    async getSome(perms: Permission['name'][]){
        let data = await this.get()
        return await data.filter((d) => {return perms.includes(d.name)})
    }
}
