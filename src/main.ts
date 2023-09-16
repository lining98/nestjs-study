import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

// 引入泛型支持
import { NestExpressApplication } from '@nestjs/platform-express';

// 引入express-session
import * as session from 'express-session';

// 引入第三方中间件
import * as cors from 'cors';

// 引入拦截器
import { commonResponse } from './common/response';

// 引入异常拦截器
import { HttpFilter } from './common/filter';

// 全局引入验证规则
import {ValidationPipe} from '@nestjs/common'

// 全局中间件，是个函数，不是个类
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';


const whiteList = ['/list'];

// function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
//   console.log(req.originalUrl);
//   // 设置白名单
//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     res.send({ msg: '小黑子' });
//   }
// }

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // 类型支持
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源的访问目录
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/ln', // 配置访问前缀路径
  });

  // 开启一个选项
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'XiaoNing',
      rolling: true,
      name: 'xiaoning.sid',
      cookie: { maxAge: 99999 },
    }),
  );

  app.use(cors());
  // app.use(MiddleWareAll);

  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new commonResponse());
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
