import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User2Service } from './user2/user2.service';

// app.controller.ts 常见是用来处理http请求以及调用service层的处理方法。

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/* nestjs 提供者 */
// @Controller('get')
// export class AppController {
//   constructor(
//     @Inject('ABC') private readonly appService: AppService,
//     @Inject('Test') private readonly shop: string[],
//     @Inject('CCC') private readonly ccc: number,
//   ) {}

//   @Get('hello')
//   // getHello(): string {
//   //   return this.appService.getHello();
//   // }

//   // 自定义注入值
//   // getHello(): string[] {
//   //   return this.shop
//   // }

//   // 工厂模式
//   getHello(): number {
//     return this.ccc
//   }
// }

/* nestjs 模块 */
// @Controller()
// export class AppController {
//   constructor(
//     // private readonly appService: AppService,
//     private readonly User2Service: User2Service,
//   ) {}

//   @Get()
//   getHello():string{
//     return this.User2Service.findAll()
//   }
// }
