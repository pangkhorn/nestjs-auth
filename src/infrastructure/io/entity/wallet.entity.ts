import { CurrencyEnum } from '@constants/enum';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from './timestamps.entity';
import { WalletHolders } from './wallet-holder.entity';

@Entity({ name: 'wallets' })
export class Wallets extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  currency: CurrencyEnum;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  income: number;

  @Column({ default: 0 })
  expense: number;

  @OneToMany(() => WalletHolders, (holder) => holder.wallet)
  holders?: WalletHolders[];
}
