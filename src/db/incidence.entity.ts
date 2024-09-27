import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Properties } from './properties.entity';

@Entity('incidence')
export class Incidence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_properties: number

    @Column({ type: 'timestamp' })
    date_incidence: number
}