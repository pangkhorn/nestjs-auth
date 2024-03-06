import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from './timestamps.entity';
import { Users } from './user.entity';
import { Wallets } from './wallet.entity';

@Entity({ name: 'wallet_holders' })
export class WalletHolders extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'wallet_id' })
  walletId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'is_owner', default: false })
  isOwner: boolean;

  @ManyToOne(() => Users, () => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(() => Wallets, () => Wallets)
  @JoinColumn({ name: 'wallet_id', referencedColumnName: 'id' })
  wallet: Wallets;
}
