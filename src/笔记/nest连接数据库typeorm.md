# nest连接数据库typeorm

## ORM框架（typeorm）

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

## 连接数据库

- 在app.module.ts中

```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中  就不需要设置entities
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

```

## 定义实体

dbtest.entity.ts

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dbtest {
  @PrimaryGeneratedColumn('uuid') // 自增id
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ select: true, comment: '注释', default: '默认值' }) // 查询时会过滤，不会返回给客户
  password: string;

  @Column()
  address: string;

  @Column({ type: 'int' })
  age: number;

  @Generated('uuid') // 自动生成列
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  count: number;

  @Column('simple-array')
  names: string[];

  @Column('simple-json')
  json: { name: string; age: number }; // 会调用JSON.stringify()存到库里面
}
```

### 列选项

```ts
    @Column({
        type:"varchar",
        name:"ipaaa", //数据库表中的列名
        nullable:true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
        comment:"注释",
        select:true,  //定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
        default:"xxxx", //加数据库级列的DEFAULT值
        primary:false, //将列标记为主要列。 使用方式和@ PrimaryColumn相同。
        update:true, //指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
        collation:"", //定义列排序规则。
    })
    ip:string
```

## 关联实体

dbtest.module.ts

```ts
import { Module } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { DbtestController } from './dbtest.controller';

import { Dbtest } from './entities/dbtest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dbtest])],
  controllers: [DbtestController],
  providers: [DbtestService],
})
export class DbtestModule {}
```
