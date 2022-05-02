import { Permission } from "src/permissions/permission.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
    })
    permissions: Permission[]
}
