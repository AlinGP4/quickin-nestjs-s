import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';

@Entity('property_ownership')
export class PropertyOwnership {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 12, nullable: false })
    dni_owner: string;

    @Column()
    id_properties: number;
}