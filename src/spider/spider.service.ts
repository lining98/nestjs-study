import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpiderService {
  async findAll() {
    const urls: string[] = [];
    const pageUrls: string[] = [];
    const baseUrl = 'https://movie.douban.com';
    const getDouban = async () => {
      // https://movie.douban.com/review/best/?start=20
      const douban = await axios
        .get('https://movie.douban.com/chart')
        .then((res) => res.data);
      const $ = cheerio.load(douban);
      // console.log($('tr.item img').length);
      $('tr.item img').each(function () {
        urls.push($(this).attr('src'));
      });
      console.log(urls);

      // 如果有分页
      // const page = $('.paginator')
      // const pageArray = page.map(function(){
      //   return $(this).text()
      // }).toArray() // .toArray()将jQuery对象转换为数组
      // console.log('page',page);
      // console.log('pageArray',pageArray);

      // console.log($('.paginator a'));
      // const pageArray = page.map(function(){
      //   return $(this).text()
      // }).toArray() // .toArray()将jQuery对象转换为数组
      // $('.paginator a').each(function(){
      //   pageUrls.push( $(this).attr('href'))
      // })
      // console.log('pageUrls',pageUrls);
    };
    await getDouban();
    this.writeFile(urls);
    return 'movie';
  }

  // 下载图片
  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(__dirname, '../movies' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }
}
