import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany } from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自增id
  // @PrimaryGeneratedColumn('uuid) // 随机id
  id: number;

  @Column({type:'varchar',length:255})
  name: string;

  @Column({type:'text'})
  desc: string;

  @Generated('uuid')
  uuid:string

  @CreateDateColumn({type:'timestamp'})
  createTime:Date

  @OneToMany(()=>Tags,(tags)=>tags.user)
  tags:Tags[]

}
