import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Incidence } from './incidence.entity';

@Entity('incidence_message')
export class IncidenceMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni_user: string

    @Column()
    text: string

    @Column({ type: 'timestamp' })
    date_message: number
}