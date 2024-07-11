import { Module } from '@nestjs/common';
import { Role } from 'src/role/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Api {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  endpoint: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  module: string;

  @Column({ type: 'enum', enum: ['get', 'post', 'patch', 'delete'], nullable: true })
  method: string;
  
}
