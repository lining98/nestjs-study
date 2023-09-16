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

// app.module.ts 根模块用于处理其他类的引用与共享

@Module({
  imports: [
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
