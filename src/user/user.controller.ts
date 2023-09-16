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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    console.log(captcha.text);

    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    // console.log(req.session);
    console.log(body, req.session.code);
    if (req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }

  }
}
