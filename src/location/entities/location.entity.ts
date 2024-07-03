import { Company } from 'src/company/entities/company.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    address: string;

    @Column({ type: 'varchar'})
    address1: string;

    @Column({ type: 'varchar'})
    address2: string;

    @Column({ type: 'varchar'})
    address3: string;

    @ManyToOne(() => Company, (company) => company.locations)
    company: Company;
}
