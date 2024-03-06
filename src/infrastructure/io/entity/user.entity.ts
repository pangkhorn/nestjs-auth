import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from './timestamps.entity';

@Entity({ name: 'users' })
export class Users extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ nullable: true, length: 255 })
  username: string;

  @Column({ nullable: true, length: 255 })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'first_name', nullable: true, length: 255 })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true, length: 255 })
  lastName?: string;
}
