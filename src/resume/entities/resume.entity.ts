import { Job } from 'src/job/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @ManyToOne(() => User, (user) => user.resumes)
  user: User

  @ManyToOne(() => Job, (job) => job.resumes)
  job: Job
}
