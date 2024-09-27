import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Incidence } from './incidence.entity';

@Entity('dashboard')
export class dashboard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ad: string
}