import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Role)
    roles: Role[]
}