import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { PropertyOwnership } from './property_ownership.entity';

@Entity('users')
export class Users {
    @PrimaryColumn({ length: 12 })
    dni: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    addres: string;

    @Column({type: 'boolean',default: false})
    admin: boolean;
}