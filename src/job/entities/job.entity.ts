import { Company } from 'src/company/entities/company.entity';
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

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'integer' })
  count: number;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column({ type: 'integer' })
  salary: number;

  @OneToMany(() => Resume, (resume) => resume.job)
  resumes: Resume[];

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @ManyToMany(() => Skill)
  @JoinTable({
    name:"job_skill",
    joinColumn: {
      name: "job_id",
      referencedColumnName: "id"
  },
  inverseJoinColumn: {
      name: "skill_id",
      referencedColumnName: "id"
  }
  })  
  skills: Skill[] 

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
