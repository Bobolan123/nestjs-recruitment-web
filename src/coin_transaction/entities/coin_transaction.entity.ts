import { Max, Min } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

export class CoinTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'integer', default: 0 })
    @Min(0)
    amount: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    transaction_date: Date;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
}
