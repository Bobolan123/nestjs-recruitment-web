import { Api } from 'src/api/entities/api.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar'})
  description: string;

  @OneToMany(() => User, user => user.role)
  users

  @ManyToMany(() => Api)
  @JoinTable({
    name:"role_api",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id"
  },
  inverseJoinColumn: {
      name: "api_id",
      referencedColumnName: "id"
  }
  })  
  categories: Api[]
}