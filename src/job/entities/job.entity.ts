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

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar'})
  description: string;

  @Column({ type: 'varchar'})
  skills: [];

  @Column({ type: 'integer'})
  count: number;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ type: 'integer'})
  salary: number;

  @OneToMany(() => Resume, (resume) => resume.job)
  resumes: Resume[]

  @ManyToOne(() => Company, (company) => company.jobs)
  company:Company

  @ManyToOne(() => Level, (level) => level.jobs)
  level:Level
}