import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserService } from './user/user.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { User2Module } from './user2/user2.module';
import { ListModule } from './list/list.module';

// 注册模块
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';

// app.module.ts 根模块用于处理其他类的引用与共享

// 连接数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbtestModule } from './dbtest/dbtest.module';
import { UsercurdModule } from './usercurd/usercurd.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库(开发环境可以使用，建议生产环境不要使用，会出现问题)
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),

    DemoModule,
    UserModule,
    User2Module,
    ListModule,
    ConfigModule.forRoot({
      path: '/xiaoning',
    }),
    UploadModule,
    PModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    DbtestModule,
    UsercurdModule,
  ],
  controllers: [AppController, DemoController], // 路由
  // 提供者
  providers: [
    AppService,
    AppService2,
    // 自定义名称，在controller注入依赖关系
    {
      provide: 'ABC',
      useClass: AppService,
    },
    // 自定义注入值
    {
      provide: 'Test',
      useValue: ['TB', 'PDD', 'JD'],
    },
    // 工厂模式
    {
      provide: 'CCC',
      inject: [AppService2],
      // useFactory(AppService2:AppService2){
      //   console.log(AppService2.getXiaoNing);
      //   return 1233
      // }
      // 也可以写为异步
      async useFactory(AppService2: AppService2) {
        return await new Promise((r) => {
          setTimeout(() => {
            r(AppService2.getXiaoNing);
          }, 500);
        });
      },
    },
  ],
})
export class AppModule {}
