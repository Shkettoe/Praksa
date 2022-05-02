import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Catch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Controller('orders')
@Catch(QueryFailedError, EntityNotFoundError)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('export')
  async exp(@Res() res: Response){
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    })

    const orders = await this.ordersService.findAll()

    const json = []

    orders.forEach((o: Order)=>{
      json.push({
        ID:o.id,
        Name: o.name,
        Email: o.email,
        'Product Title': '',
        Price: '',
        Quantity: ''
      })

      o.order_items.forEach((i: OrderItem)=>{
        json.push({
          ID:'',
          Name: '',
          Email: '',
          'Product Title': i.product_title,
          Price: i.price,
          Quantity: i.quantity
        })
      })
    })

    const csv = parser.parse(json)

    res.header('Content-Type', 'text/csv')
    res.attachment('orders.csv')
    return res.send(csv)
  }

  @Post('chart')
  chart() {
    return this.ordersService.chart()
  }
}
