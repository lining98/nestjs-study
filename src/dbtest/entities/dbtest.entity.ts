import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Dbtest {
  @PrimaryGeneratedColumn('uuid') // 自增id
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({select:true,comment:'注释',default:'默认值'}) // 查询时会过滤，不会返回给客户
  password: string;

  @Column()
  address: string;

  @Column({type:'int'})
  age: number;

  @Generated('uuid') // 自动生成列
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type:'enum',
    enum:[1,2,3],
    default:1
  })
  count:number

  @Column('simple-array')
  names:string[]

  @Column('simple-json')
  json:{name:string,age:number} // 会调用JSON.stringify()存到库里面
}
