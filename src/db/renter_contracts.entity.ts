import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Contrats } from './contrats.entity';

@Entity('renter_contracts')
export class RenterContracts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    dni_renter: string;
}