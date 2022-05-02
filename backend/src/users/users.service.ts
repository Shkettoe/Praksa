import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-users.dto';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private readonly roleServ: RolesService){}

  findAll(query: Partial<User>) {
    const q = plainToClass(GetUserDto, query)
    return this.userRepo.find({where: q, relations: ['role']})
  }

  async findOne(id: number) {
    try{
      return await this.userRepo.findOneOrFail(id, {relations: ['role']})
    }
    catch(err){
      throw new NotFoundException('user not found', err)
    }
  }
  
  async create(createUserDto: CreateUserDto) {
    const {role, ...data} = createUserDto
    const user = await this.userRepo.create({...data, role: {id: role || 17}})
    return await this.userRepo.save(user)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto['password'] && updateUserDto['password'].length){
      const salt = await bcrypt.genSalt(13)
      updateUserDto.password = `${salt}|${await bcrypt.hash(updateUserDto.password, salt)}`
    }
    const user = await this.findOne(id)
    for (const key in user) {
      if (updateUserDto[key]) user[key] = updateUserDto[key]
    }
    return await this.userRepo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if(!user) throw new NotFoundException('user not found')
    return this.userRepo.remove(user)
  }
}
