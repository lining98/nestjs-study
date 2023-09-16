import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Response,
  Query,
  Headers,
  HttpCode,
  Delete,
  Version,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 验证码插件
import * as svgCaptcha from 'svg-captcha';
import { Session } from 'inspector';

@Controller('user')
// @Controller({
//   path:'user',
//   // 版本控制
//   version:'1' // http://localhost:3000/v1/user
// })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Req() req, @Res() res) {
    const Captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = Captcha.text;
    res.type('image/svg+xml');
    res.send(Captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(body, req.session.code);
    if (req.session.code.toLocalewerCase() === body?.code?.toLocalewerCase()) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

  // @Get()
  // @Version('1') // 只对findAll单独去加
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  // findAll (@Request() req){
  //   console.log(req);
  //   return {
  //     code:200,
  //     msg:req.query.name
  //   }
  // }
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name,
    };
  }

  @Post()
  // create (@Request() req){
  //   console.log(req);
  //   return {
  //     code:200,
  //     meg:req.body.name
  //   }
  // }
  create(@Body('name') body) {
    console.log(body);
    return {
      code: 200,
      // msg:body.name
    };
  }

  @Get(':id')
  // findId (@Request() req) {
  //   console.log(req.params);
  //   return {
  //     code:200
  //   }
  // }
  // findId(@Param() params) {
  //   // @Param()     读取结果为对象   { id: '11122' }
  //   // @Param('id') 读取属性为id的值 11122
  //     console.log(params);
  //     return {
  //       code:200
  //     }
  // }
  @HttpCode(501) // 用于控制状态码
  findId(@Param('id') params, @Headers() header) {
    console.log(header);
    return {
      code: 200,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
