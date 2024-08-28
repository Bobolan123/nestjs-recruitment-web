import { CoinTransaction } from 'src/coin_transaction/entities/coin_transaction.entity';
import { Resume } from 'src/resume/entities/resume.entity';
import { Review } from 'src/review/entities/review.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserSkillLevel } from 'src/user_skill_level/entities/user_skill_level.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'int', nullable: true })
  otp: number;

  @Column({ type: 'date', nullable: true })
  otpExpired: Date;

  @Column({ type: 'boolean', nullable: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  /**
   * m - male
   * f - female
   */
  gender: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => CoinTransaction, (coinTransaction) => coinTransaction.user)
  coinTransactions: CoinTransaction[];

  @OneToMany(() => UserSkillLevel, (UserSkillLevel) => UserSkillLevel.user)
  UserSkillLevels: UserSkillLevel[];

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
