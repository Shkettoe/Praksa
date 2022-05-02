import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/permission.entity'
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-items.entity';
require('dotenv').config()
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permissions/guards/permission.guard';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [User, Role, Permission, Product, Order, OrderItem],
    synchronize: true
  }), UsersModule, RolesModule, PermissionsModule, ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: PermissionGuard}],
})
export class AppModule {}
