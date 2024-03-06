import { Job } from 'src/job/entities/job.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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