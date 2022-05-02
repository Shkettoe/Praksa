import { Exclude } from "class-transformer";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @ManyToOne(() => Role)
    @JoinTable({name: 'role_id'})
    role: Role
}