import { Job } from 'src/job/entities/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable:true })
  name: string;

  @Column({ type: 'varchar',nullable:true })
  description: string;

  @Column({ type: 'bytea', nullable: true })
  logo: Buffer;

  @Column({ type: 'varchar',nullable:true })
  location: string;

  @Column({ type: 'varchar',nullable:true })
  filename: string;


  @OneToMany(() => Job, job => job.company)
  jobs: Job[]
}