import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    price: number
}
