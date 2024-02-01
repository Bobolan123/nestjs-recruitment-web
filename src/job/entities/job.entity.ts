import { Company } from 'src/company/entities/company.entity';
import { Level } from 'src/level/entities/level.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @OneToMany(() => Resume, (resume) => resume.job)
  resumes: Resume[]

  @ManyToOne(() => Company, (company) => company.jobs)
  company:Company

  @ManyToOne(() => Level, (level) => level.jobs)
  level:Level
}