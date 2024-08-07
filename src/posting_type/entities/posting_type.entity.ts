import { Job } from 'src/job/entities/job.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostingType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    cost: number;

    @Column('decimal', { precision: 5, scale: 2 })
    discount: number;

    @OneToMany(() => Job, (job) => job.postingType)
    jobs: Job[];
}
