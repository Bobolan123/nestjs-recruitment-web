import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm';

@Entity()
export class UserSkillLevel {
    @PrimaryGeneratedColumn()
    user_skill_level_id: number;

    @ManyToOne(() => User, (user) => user.UserSkillLevels)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Skill, (skill) => skill.userSkillLevels)
    @JoinColumn({ name: 'skill_id' })
    skill: Skill;

    @Column({ type: 'enum', enum: ['advanced', 'intermediate', 'beginner'] })
    level: string;
} 
