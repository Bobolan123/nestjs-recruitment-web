import { Job } from 'src/job/entities/job.entity';
import { UserSkillLevel } from 'src/user_skill_level/entities/user_skill_level.entity';
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
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => UserSkillLevel, (userSkillLevel) => userSkillLevel.skill)
    userSkillLevels: UserSkillLevel[];

    @ManyToMany(() => Job, (job) => job.skills)
    @JoinTable({
        name: 'job_skill',
        joinColumn: {
            name: 'skill_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'job_id',
            referencedColumnName: 'id',
        },
    })
    jobs: Job[];

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
