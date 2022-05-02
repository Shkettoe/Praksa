import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private prodRepo: Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    const prod = await this.prodRepo.create(createProductDto)
    return await this.prodRepo.save(prod)
  }

  findAll() {
    return this.prodRepo.find()
  }

  findOne(id: number) {
    return this.prodRepo.findOne(id)
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      var prod = await this.findOne(id)
      for (const key in prod) {
        if(updateProductDto[key]) prod[key] = updateProductDto[key]
      }
      return await this.prodRepo.save(prod)
    }catch(err){
      throw new NotFoundException('product not found', err)
    }
  }

  async remove(id: number) {
    try{
      const prod = await this.findOne(id)
      return this.prodRepo.remove(prod)
    }catch(err){
      throw new NotFoundException('product not found', err)
    }
  }
}
