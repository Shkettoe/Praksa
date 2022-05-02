import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-items.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Exclude()
    first_name: string

    @Column()
    @Exclude()
    last_name: string

    @Column()
    email: string

    @CreateDateColumn()
    created_at: string

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[]

    @Expose()
    get name(){
        return `${this.last_name} ${this.first_name}`
    }

    @Expose()
    get total(){
        return this.order_items.reduce((sum, i)=>sum + i.quantity * i.price, 0)
    }
}
