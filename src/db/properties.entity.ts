import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('properties')
export class Properties {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 12 })
    dni: string;

    @Column()
    zipcode: number;

    @Column()
    address: string;

    @Column({ type: 'double' })
    size: number;

    @Column()
    rooms: number;

    @Column()
    bathroom: number;

    @Column({ type: 'bool' })
    garage: boolean;

    @Column()
    price: number;

    @Column({ type: 'boolean', default: false })
    hired: boolean;
}