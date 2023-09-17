import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './usercurd.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn() // 自增id
  id: number;

  @Column()
  tags: string;

  @ManyToOne(() => User,(user)=>user.tags)
  @JoinColumn()
  user: User;
}
