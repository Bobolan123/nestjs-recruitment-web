import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Length, Min, Max } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    overal: number;

    @Column({ type: 'varchar', length: 80 })
    @Length(10, 80, { message: 'overal must be at least 10 characters long' })
    sumary: string;

    @Column({ type: 'boolean' })
    satisfied: boolean;

    @Column({ type: 'varchar', length: 140 })
    @Length(50, 140, { message: 'reason must be at least 50 characters long' })
    reason: string;

    @Column({ type: 'varchar', length: 10000 })
    @Length(50, 10000, {
        message: 'experience must be at least 50 characters long',
    })
    experience: string;

    @Column({ type: 'varchar', length: 10000 })
    @Length(50, 10000, {
        message: 'suggestion must be at least 50 characters long',
    })
    suggestion: string;

    @Column({ type: 'int' })
    @Min(1, { message: 'salary_benefit must be between 1 and 5' })
    @Max(5, { message: 'salary_benefit must be between 1 and 5' })
    salary_benefit: number;

    @Column({ type: 'int' })
    @Min(1, { message: 'training_learning must be between 1 and 5' })
    @Max(5, { message: 'training_learning must be between 1 and 5' })
    training_learning: number;

    @Column({ type: 'int' })
    @Min(1, { message: 'culture_fun must be between 1 and 5' })
    @Max(5, { message: 'culture_fun must be between 1 and 5' })
    culture_fun: number;

    @Column({ type: 'int' })
        @Min(1, { message: 'office_workspace must be between 1 and 5' })
        @Max(5, { message: 'office_workspace must be between 1 and 5' })
    office_workspace: number;

    @Column({ type: 'boolean' })
    recommend: boolean;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Company, (company) => company.reviews)
    company: Company;

}
