import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Api {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  endpoint: string;

  @Column({ type: 'varchar'})
  description: string;

}