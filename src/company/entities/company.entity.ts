import { Max, Min } from 'class-validator';
import { Job } from 'src/job/entities/job.entity';
import { Location } from 'src/location/entities/location.entity';
import { Review } from 'src/review/entities/review.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    briefInformation: string;

    @Column({ type: 'varchar', nullable: true })
    type: string;

    @Column({ type: 'varchar', nullable: true })
    industry: string;

    @Column({ type: 'varchar', nullable: true })
    size: string;
    
    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    logo: string;

    @Column({ type: 'varchar', nullable: true })
    country: string;

    @OneToMany(() => Job, (job) => job.company, {
        onDelete: 'CASCADE',
        // cascade:true
    })
    jobs: Job[];

    @OneToMany(() => Review, (review) => review.company)
    reviews: Review[];

    @OneToMany(() => Location, (location) => location.company)
    locations: Location[];

    @ManyToMany(() => Skill)
    @JoinTable({
        name: 'company_skill',
        joinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'skill_id',
            referencedColumnName: 'id',
        },
    })
    skills: Skill[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date;
}
