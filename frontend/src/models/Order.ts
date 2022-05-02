import { OrderItem } from "./OrderItem";

export class Order{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public order_items: OrderItem[] 
    ){}
}