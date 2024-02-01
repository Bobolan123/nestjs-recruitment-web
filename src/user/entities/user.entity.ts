import { Resume } from 'src/resume/entities/resume.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  /**
   * m - male
   * f - female
   */
  gender: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[]
}