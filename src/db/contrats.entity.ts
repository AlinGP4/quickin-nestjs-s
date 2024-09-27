import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Properties } from './properties.entity';

@Entity('contrats')
export class Contrats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_propertie: number

    @Column({ type: 'varchar', length: 12, nullable: false })
    dni_renter: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    start_contract: number

    @Column({ type: 'varchar', length: 30, nullable: true })
    end_contract: number

    @Column({ type: 'varchar', length: 30, nullable: true })
    sign_contact: number
}