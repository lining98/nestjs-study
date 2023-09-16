import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    // console.log('DTO', DTO);
    console.log('errors', errors);
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}

// console.log(value, metadata);
// { name: '李宁', age: '25' } // value 传递的参数
/**
   * {
      metatype: [class CreateLoginDto],
      type: 'body',
      data: abcc
      // login.controller
      // create(@Body('abcc',LoginPipe) createLoginDto: CreateLoginDto) {
      //   return this.loginService.create(createLoginDto);
      // }
      }
   * */
