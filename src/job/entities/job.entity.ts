import { Company } from 'src/company/entities/company.entity';
import { PostingType } from 'src/posting_type/entities/posting_type.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
    /**
     * this decorator will help to auto generate id for the table.
     */
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    location: string;

    @Column({ type: 'varchar', nullable: true })
    level: string;

    @Column({ type: 'json', nullable: true })
    description: string;

    @Column({ type: 'integer', nullable: true })
    count: number;

    @Column({ nullable: true })
    status: Boolean;

    @Column({ type: 'integer' })
    salary: number;

    @Column({ type: 'timestamptz', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamptz', nullable: true })
    endDate: Date;

    @OneToMany(() => Resume, (resume) => resume.job, {
        onDelete: 'SET NULL',
    })
    resumes: Resume[];

    @ManyToOne(() => Company, (company) => company.jobs, {
        onDelete: 'CASCADE',
    })
    company: Company;

    @ManyToOne(() => PostingType, (postingType) => postingType.jobs)
    postingType: PostingType;

    @ManyToMany(() => Skill, {
        onDelete: 'SET NULL',
    })
    @JoinTable({
        name: 'job_skill',
        joinColumn: {
            name: 'job_id',
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
