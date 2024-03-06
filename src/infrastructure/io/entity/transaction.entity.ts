import { TransactionTypeEnum } from '@constants/enum';
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from './timestamps.entity';
import { Users } from './user.entity';
import { Wallets } from './wallet.entity';

@Entity({ name: 'transactions' })
export class Transactions extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  type: TransactionTypeEnum;

  @Column({ nullable: true })
  remark: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @ManyToOne(() => Wallets, () => Wallets)
  @JoinColumn({ name: 'wallet_id', referencedColumnName: 'id' })
  wallet: Wallets;

  @ManyToOne(() => Users, () => Users)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  creator: Users;
}
