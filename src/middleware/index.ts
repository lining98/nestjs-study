import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable() // 装饰器装饰一下
// 抛出一个类
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我来了，嘿嘿嘿');

    res.send('我被拦截了')

    // next();

    // res.send() 和 next() 不能一块写
  }
}
