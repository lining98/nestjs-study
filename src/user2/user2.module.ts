import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { User2Service } from './user2.service';
import { User2Controller } from './user2.controller';

// 引入中间件
import { Logger } from 'src/middleware';

@Module({
  controllers: [User2Controller],
  providers: [User2Service],
  // 模块
  exports: [User2Service],
})
export class User2Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 注册中间件

    consumer.apply(Logger).forRoutes('user2')

    // consumer
    //   .apply(Logger)
    //   // .forRoutes({ path: 'user2', method: RequestMethod.GET });
    //   .forRoutes({ path: 'user2', method: RequestMethod.POST }); // POST方法不会被拦截

//
    // 会被里面所有的地址都会被拦截
    // consumer.apply(Logger).forRoutes(User2Controller);
  }
}
